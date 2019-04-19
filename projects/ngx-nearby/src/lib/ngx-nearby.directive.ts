import { Directive, HostListener, ElementRef, Output, EventEmitter, Input } from '@angular/core'
import { ScrollModel, CoordinateModel, ElementPositionModel } from './Models'

@Directive({
  selector: '[ngxNearby]',
})
export class NgxNearbyDirective {
  @Input() nearbyActiveDistance: number
  @Output() nearby = new EventEmitter()

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:mousemove', ['$event'])
  mousemoveFn(ev: MouseEvent) {
    requestAnimationFrame(() => {
      const mousePosition = this.getMousePos(ev)
      const documentScrolls: ScrollModel = {
        left: document.body.scrollLeft + document.documentElement.scrollLeft,
        top: document.body.scrollTop + document.documentElement.scrollTop,
      }
      const elRect = this.elementRef.nativeElement.getBoundingClientRect()
      const elCoords: ElementPositionModel = {
        x1: elRect.left + documentScrolls.left,
        x2: elRect.width + elRect.left + documentScrolls.left,
        y1: elRect.top + documentScrolls.top,
        y2: elRect.height + elRect.top + documentScrolls.top,
      }
      const closestPoint: CoordinateModel = { x: mousePosition.x, y: mousePosition.y }

      if (mousePosition.x < elCoords.x1) {
        closestPoint.x = elCoords.x1
      } else if (mousePosition.x > elCoords.x2) {
        closestPoint.x = elCoords.x2
      }
      if (mousePosition.y < elCoords.y1) {
        closestPoint.y = elCoords.y1
      } else if (mousePosition.y > elCoords.y2) {
        closestPoint.y = elCoords.y2
      }
      if (!this.nearby.isStopped) {
        const distance = this.distancePoints(mousePosition.x, mousePosition.y, closestPoint.x, closestPoint.y)
        if (this.nearbyActiveDistance !== undefined && this.nearbyActiveDistance >= distance) {
          this.nearby.emit({ distance, nearby: true })
        } else if (this.nearbyActiveDistance !== undefined && this.nearbyActiveDistance < distance) {
          this.nearby.emit({ distance, nearby: false })
        } else if (this.nearbyActiveDistance === undefined) {
          this.nearby.emit(distance)
        }
      }
    })
  }

  private distancePoints(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  }

  private getMousePos(e: MouseEvent): CoordinateModel {
    let posX = 0
    let posY = 0

    if (e.pageX || e.pageY) {
      posX = e.pageX
      posY = e.pageY
    } else if (e.clientX || e.clientY) {
      posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
      posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }
    return { x: posX, y: posY }
  }
}
