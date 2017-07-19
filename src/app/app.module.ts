import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,

    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9kUn8_TBheTkprqbt1vWg0wB19dfph10'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
