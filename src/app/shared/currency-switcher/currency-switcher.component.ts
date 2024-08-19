import { Component } from '@angular/core';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-currency-switcher',
  templateUrl: './currency-switcher.component.html',
  styleUrls: ['./currency-switcher.component.scss']
})
export class CurrencySwitcherComponent {
  currencies = ['USD', 'EUR', 'GBP'];
  selectedCurrency: string;

  constructor(private currencyService: CurrencyService) {
    this.selectedCurrency = this.currencyService.getCurrentCurrency();
  }

  onCurrencyChange(newCurrency: string) {
    this.currencyService.setCurrency(newCurrency);
  }
}
