# NgxNearby

## Usage
#### in module
```typescript
import { NgxNearbyModule } from 'projects/ngx-nearby/src/public-api'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxNearbyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

#### in template
```html
<div ngxNearby
    (nearby)="onNearby($event)"
    [nearbyActiveDistance]="130"
    >
    .
    .
    </div>
```

#### in component
```typescript
onNearby(result: NearbyResultModel) {
    const { nearby, distance } = result
    console.log(nearby, distance)
}

```
