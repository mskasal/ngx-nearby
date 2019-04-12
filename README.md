# NgxNearby

## Usage

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