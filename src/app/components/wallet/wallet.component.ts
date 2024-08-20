import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/service/wallet.service';
import { CurrencyService } from 'src/app/service/currency.service';
import { ThemeService } from 'src/app/service/theme.service';

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

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  wallet: Wallet | null = null;
  selectedToken: string = '';
  transactions: Transaction[] = [];
  filteredTokens: Token[] = [];
  filteredTransactions: Transaction[] = [];
  selectedTokenBalance: number = 0;
  currentCurrency: string = 'USD';
  isConverterOpen: boolean = false;
  theme: string = 'light';

  constructor(
    private walletService: WalletService,
    private currencyService: CurrencyService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.walletService.getWallet().subscribe(wallet => {
      this.wallet = wallet;
      this.filteredTokens = wallet.tokens;
      this.selectedToken = wallet.tokens[0]?.symbol || '';
      this.updateSelectedTokenBalance();
      this.loadTransactions(this.selectedToken);
    });

    this.currencyService.currentCurrency$.subscribe(currency => {
      this.currentCurrency = currency;
    });
    this.themeService.getTheme().subscribe(theme => {
      this.theme = theme;
    });
  }

    // Открытие модального окна
    openConverter(): void {
      this.isConverterOpen = true;
    }
  
    // Закрытие модального окна
    closeConverter(): void {
      this.isConverterOpen = false;
    }

  onSearchTokens(searchTerm: string): void {
    if (this.wallet) {
      this.filteredTokens = this.wallet.tokens.filter(token =>
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  onSearchTransactions(searchTerm: string): void {
    this.filteredTransactions = this.transactions.filter(transaction =>
      transaction.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  addFunds(amount: number): void {
    if (this.wallet) {
      const token = this.wallet.tokens.find(t => t.symbol === this.selectedToken);
      if (token) {
        token.amount += amount;
        this.wallet.totalValue += amount;
        this.walletService.updateWallet(this.wallet).subscribe(() => {
          this.walletService.addTransaction({
            token: this.selectedToken,
            amount: amount,
            type: 'buy',
            date: new Date().toISOString()
          }).subscribe(() => this.loadTransactions(this.selectedToken));
        });
      }
    }
  }

  sendFunds(amount: number): void {
    if (this.wallet) {
      const token = this.wallet.tokens.find(t => t.symbol === this.selectedToken);
      if (token && token.amount >= amount) {
        token.amount -= amount;
        this.wallet.totalValue -= amount;
        this.walletService.updateWallet(this.wallet).subscribe(() => {
          this.walletService.addTransaction({
            token: this.selectedToken,
            amount: amount,
            type: 'sell',
            date: new Date().toISOString()
          }).subscribe(() => this.loadTransactions(this.selectedToken));
        });
      }
    }
  }

  loadTransactions(token: string): void {
    this.walletService.getTransactions(token).subscribe(transactions => {
      this.transactions = transactions;
      this.filteredTransactions = transactions;
    });
  }

  updateSelectedTokenBalance(): void {
    const token = this.wallet?.tokens.find(t => t.symbol === this.selectedToken);
    this.selectedTokenBalance = token?.amount || 0;
  }

  convertToCurrentCurrency(value: number): number {
    return this.currencyService.convertValue(value, this.currentCurrency);
  }

  onTokenSelect(token: string): void {
    this.selectedToken = token;
    this.updateSelectedTokenBalance();
    this.loadTransactions(token);
  }
}
