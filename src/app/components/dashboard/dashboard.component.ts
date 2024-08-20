import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Wallet {
  totalValue: number;
  tokens: { symbol: string; amount: number }[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  wallet: Wallet | null = null;
  actionType: string = "buy";
  cryptoCurrency: string = "BTC";
  amount: string = '0';
  result: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Wallet>('http://localhost:3000/wallet').subscribe(data =>{
      this.wallet = data
      console.log(data)
  });
    console.log(this.actionType,this.cryptoCurrency,this.amount,this.result)
  }

  onAmountChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.amount = inputElement.value;
  }

  executeAction(): void {
    const selectedToken = this.wallet?.tokens.find(token => token.symbol === this.cryptoCurrency);
    if (selectedToken) {
      if (this.actionType === 'buy') {
        this.result = `Bought ${this.amount} ${this.cryptoCurrency}`;
      } else if (this.actionType === 'sell') {
        this.result = `Sold ${this.amount} ${this.cryptoCurrency}`;
      } else if (this.actionType === 'convert') {
        this.result = `Converted ${this.amount} ${this.cryptoCurrency}`;
      }
    }
  }
}
