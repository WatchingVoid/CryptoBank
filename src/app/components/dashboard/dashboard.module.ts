import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
