import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FunctionalitiesModule } from './functionalities/functionalities.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InternService } from './services/intern.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FunctionalitiesModule
  ],
  providers: [
    InternService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
