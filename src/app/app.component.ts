import { Component, ViewChild, ElementRef } from '@angular/core'
import { NearbyResultModel } from 'projects/ngx-nearby/src/public-api'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ngx-nearby-demo'
  @ViewChild('img') imgRef: ElementRef
  onProgress(result: NearbyResultModel) {
    console.log(result)

    if (result.nearby) {
      this.imgRef.nativeElement.style.transform = 'rotate(90deg)'
    } else {
      this.imgRef.nativeElement.style.transform = 'rotate(-90deg)'
    }
  }
}
