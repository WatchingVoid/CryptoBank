import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/service/crypto.service';
import { SearchService } from 'src/app/service/search.service';

interface Cryptocurrency {
  id: number;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  supply: number;
}

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  cryptocurrencies: Cryptocurrency[] = [];
  filteredCryptocurrencies: any[] = [];
  sortColumn: any = 'marketCap';
  sortDirection: boolean = false; // false: descending, true: ascending

  constructor(private cryptoService: CryptoService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.cryptoService.getCryptoListings().subscribe(
      (data) => {
        this.cryptocurrencies = data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          symbol: item.symbol,
          price: item.quote.USD.price,
          marketCap: item.quote.USD.market_cap,
          supply: item.total_supply
        }));
        this.filteredCryptocurrencies = this.cryptocurrencies;
      },
      (error) => {
        console.error('Ошибка при загрузке данных:', error);
      }
    );
  }
  
  sortTable(column: keyof Cryptocurrency): void {
    this.sortDirection = !this.sortDirection;
    const direction = this.sortDirection ? 1 : -1;
  
    this.cryptocurrencies.sort((a, b) => {
      if (a[column] > b[column]) {
        return direction;
      } else if (a[column] < b[column]) {
        return -direction;
      } else {
        return 0;
      }
    });
  }
  
  onSearchChange(searchTerm: string) {
    this.filteredCryptocurrencies = this.searchService.filterItems(
      this.cryptocurrencies, 
      searchTerm, 
      ['name', 'symbol']
    );
  }
}

// import { Component, OnInit } from '@angular/core';
// import { CurrencyService } from '../shared/currency.service';
// import { CryptoService } from '../shared/crypto.service';

// interface Cryptocurrency {
//   name: string;
//   symbol: string;
//   price: number; // Цена в USD
//   marketCap: number; // Рыночная капитализация в USD
// }

// @Component({
//   selector: 'app-watchlist',
//   templateUrl: './watchlist.component.html',
//   styleUrls: ['./watchlist.component.scss']
// })
// export class WatchlistComponent implements OnInit {
//   cryptocurrencies: Cryptocurrency[] = [];
//   filteredCryptocurrencies: Cryptocurrency[] = [];
//   currentCurrency: string = 'USD';
//   sortColumn: keyof Cryptocurrency = 'marketCap';
//   sortDirection: boolean = false; // false: descending, true: ascending

//   constructor(
//     private cryptoService: CryptoService,
//     private currencyService: CurrencyService
//   ) {}

//   ngOnInit(): void {
//     this.cryptoService.getCryptoListings().subscribe(data => {
//       this.cryptocurrencies = data;
//       this.filteredCryptocurrencies = data;
//       this.sortCryptocurrencies();
//     });

//     this.currencyService.currentCurrency$.subscribe(currency => {
//       this.currentCurrency = currency;
//     });
//   }

//   convertValue(value: number): number {
//     return this.currencyService.convertValue(value, this.currentCurrency);
//   }

//   onSearchChange(searchTerm: string): void {
//     this.filteredCryptocurrencies = this.cryptocurrencies.filter(crypto =>
//       crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     this.sortCryptocurrencies();
//   }

//   sortCryptocurrencies(): void {
//     const direction = this.sortDirection ? 1 : -1;
//     this.filteredCryptocurrencies.sort((a, b) => {
//       if (a[this.sortColumn] > b[this.sortColumn]) {
//         return direction;
//       } else if (a[this.sortColumn] < b[this.sortColumn]) {
//         return -direction;
//       } else {
//         return 0;
//       }
//     });
//   }

//   onSortColumn(column: keyof Cryptocurrency): void {
//     if (this.sortColumn === column) {
//       this.sortDirection = !this.sortDirection;
//     } else {
//       this.sortColumn = column;
//       this.sortDirection = false;
//     }
//     this.sortCryptocurrencies();
//   }
// }
