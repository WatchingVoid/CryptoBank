import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencySubject = new BehaviorSubject<string>('USD');
  currentCurrency$ = this.currencySubject.asObservable();

  private exchangeRates: { [key: string]: number } = {
    USD: 1,  // Базовая валюта
    EUR: 0.85,
    GBP: 0.75,
    // Можно добавить другие валюты и их курсы
  };

  setCurrency(currency: string) {
    this.currencySubject.next(currency);
  }

  convertValue(valueInUSD: number, targetCurrency: string): number {
    const rate = this.exchangeRates[targetCurrency];
    return valueInUSD * rate;
  }

  getCurrentCurrency(): string {
    return this.currencySubject.getValue();
  }
}
