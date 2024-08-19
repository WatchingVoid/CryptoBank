import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { CurrencySwitcherComponent } from './currency-switcher/currency-switcher.component';

@NgModule({
  declarations: [SearchComponent, CurrencySwitcherComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [SearchComponent,CurrencySwitcherComponent]
})
export class SharedModule { }