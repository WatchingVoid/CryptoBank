import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/service/crypto.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Transaction {
  id: number;
  token: string;
  amount: number;
  type: string;
  date: string;
}

interface Wallet {
  totalValue: number;
  tokens: { symbol: string, amount: number }[];
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  wallet: Wallet | null = null;
  transactions: Transaction[] = [];

  constructor(private cryptoService: CryptoService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchWallet().subscribe(data => this.wallet = data);
    this.fetchTransactions().subscribe(data => this.transactions = data);
    this.updateWalletValue();
  }

  fetchWallet(): Observable<Wallet> {
    return this.http.get<Wallet>('http://localhost:3000/wallet');
  }

  fetchTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('http://localhost:3000/transactions');
  }

  updateWalletValue(): void {
    if (this.wallet) {
      this.wallet.tokens.forEach(token => {
        this.cryptoService.getCryptoListings().subscribe(data => {
          const crypto = data.data.find((item: any) => item.symbol === token.symbol);
          if (crypto) {
            token.amount *= crypto.quote.USD.price;
          }
        });
      });
    }
  }
}
