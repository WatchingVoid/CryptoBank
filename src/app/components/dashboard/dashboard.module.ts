import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Убедитесь, что FormsModule импортирован
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule  // Импортируем FormsModule здесь
  ],
  exports: [DashboardComponent]  // Экспортируем DashboardComponent
})
export class DashboardModule { }
