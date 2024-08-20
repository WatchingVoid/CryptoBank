import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private apiUrl = 'https://pro-api.coinmarketcap.com/v1';
  private apiKey = 'b10cf512-d612-4a88-8603-53edc21c7905'; //API с аккаунта 

  constructor(private http: HttpClient) { }

  // Функция получения списков криптовалют
  getCryptoListings(): Observable<any> {
    const headers = new HttpHeaders({
      'X-CMC_PRO_API_KEY': this.apiKey
    });
  
    return this.http.get('/api/v1/cryptocurrency/listings/latest', { headers });
  }
  
  // Функция для получения подробной информации о конкретной криптовалюте
  getCryptoDetails(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-CMC_PRO_API_KEY': this.apiKey
    });

    return this.http.get(`${this.apiUrl}/cryptocurrency/info`, { headers, params: { id } });
  }

  // Функция конвертации криптовалюты
  convertCrypto(amount: number, from: string, to: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-CMC_PRO_API_KEY': this.apiKey
    });

    return this.http.get(`${this.apiUrl}/tools/price-conversion`, {
      headers,
      params: {
        amount: amount.toString(),
        symbol: from,
        convert: to
      }
    });
  }

  // Функция для получения исторических данных о ценах криптовалюты
  getCryptoHistory(symbol: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-CMC_PRO_API_KEY': this.apiKey
    });
  
    const endpoint = `${this.apiUrl}/cryptocurrency/ohlcv/historical`;
  
    return this.http.get(endpoint, {
      headers,
      params: {
        symbol: symbol,
        time_start: this.getStartTime(),
        time_end: this.getEndTime(),
        interval: 'daily'
      }
    });
  }
  

    // Функция для получения текущего времени
  getEndTime(): string {
    return Math.floor(Date.now() / 1000).toString();
  }
  
    // Функция для получения времени за 30 дней назад
  getStartTime(): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 30);
    return Math.floor(currentDate.getTime() / 1000).toString();
  }
}
