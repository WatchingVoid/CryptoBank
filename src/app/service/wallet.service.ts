import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Token {
  symbol: string;
  amount: number;
}

interface Transaction {
  id?: number;
  token: string;
  amount: number;
  type: 'buy' | 'sell' | 'transfer';
  date: string;
}

interface Wallet {
  totalValue: number;
  tokens: Token[];
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getWallet(): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.apiUrl}/wallet`);
  }

  updateWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.put<Wallet>(`${this.apiUrl}/wallet`, wallet);
  }

  getTransactions(token: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions?token=${token}`);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
  }
}
