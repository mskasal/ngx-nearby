import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { NgxNearbyModule } from 'projects/ngx-nearby/src/public-api'
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxNearbyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
