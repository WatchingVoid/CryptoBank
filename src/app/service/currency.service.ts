import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencySubject = new BehaviorSubject<string>('RUB');
  currentCurrency$ = this.currencySubject.asObservable();

  private exchangeRates: { [key: string]: number } = {
    RUB: 1,  // Базовая валюта (кросс-курс)
  };

  constructor(private http: HttpClient) {
    this.loadExchangeRates();
  }

  // Метод для загрузки актуальных курсов валют с сайта ЦБР
  loadExchangeRates(): void {
    this.http.get('https://www.cbr-xml-daily.ru/daily_json.js')
      .pipe(
        map((data: any) => {
          const rates: { [key: string]: number } = {};
          for (const key in data.Valute) {
            rates[key] = data.Valute[key].Value / data.Valute[key].Nominal;
          }
          rates['RUB'] = 1;  // Добавляем рубль как базовую валюту
          return rates;
        })
      )
      .subscribe(rates => {
        this.exchangeRates = rates;
      });
  }

  setCurrency(currency: string): void {
    this.currencySubject.next(currency);
  }

  convertValue(valueInUSD: number, targetCurrency: string): number {
    const rate = this.exchangeRates[targetCurrency];
    if (!rate) {
      console.warn(`Exchange rate for ${targetCurrency} not found`);
      return valueInUSD;  // Если курс не найден, возвращаем исходное значение
    }
    return valueInUSD * rate;
  }

  getCurrentCurrency(): string {
    return this.currencySubject.getValue();
  }
}