
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/service/search.service';

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
  filteredTokens: any[] = [];

  constructor(private http: HttpClient, private searchService: SearchService) {}

  ngOnInit(): void {
    this.fetchWallet().subscribe(data => {
      this.wallet = data;
      this.filteredTokens = this.wallet.tokens;
    });
    this.fetchTransactions().subscribe(data => this.transactions = data);
  }

  fetchWallet(): Observable<Wallet> {
    return this.http.get<Wallet>('http://localhost:3000/wallet');
  }

  fetchTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('http://localhost:3000/transactions');
  }

  onSearchChange(searchTerm: string) {
    if (this.wallet) {
      this.filteredTokens = this.searchService.filterItems(
        this.wallet.tokens, 
        searchTerm, 
        ['symbol']
      );
    }
  }
}