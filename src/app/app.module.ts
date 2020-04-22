import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PaginationComponent } from './pagination/pagination.component';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';

import { ApplicationService } from './services/app.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent, PaginationComponent, ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
