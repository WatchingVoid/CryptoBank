import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/service/crypto.service';
import { SearchService } from 'src/app/service/search.service';
import { CurrencyService } from 'src/app/service/currency.service'; 
import { KENDO_CHARTS} from '@progress/kendo-angular-charts';
import { KENDO_SPARKLINE } from '@progress/kendo-angular-charts';

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
  filteredCryptocurrencies: Cryptocurrency[] = [];
  sortColumn: keyof Cryptocurrency = 'marketCap';
  sortDirection: boolean = false; // false: descending, true: ascending
  currentCurrency: string = 'USD';
  data = [1,2,2,3,4,,5,5,6,7,7];
  constructor(
    private cryptoService: CryptoService, 
    private searchService: SearchService,
    private currencyService: CurrencyService // Инъекция CurrencyService
  ) {}

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
        this.sortCryptocurrencies();
      },
      (error) => {
        console.error('Ошибка при загрузке данных:', error);
      }
    );

    // Подписка на изменения валюты
    this.currencyService.currentCurrency$.subscribe(currency => {
      this.currentCurrency = currency;
      this.sortCryptocurrencies(); // Пересортировка данных при изменении валюты
    });
  }
  
  sortTable(column: keyof Cryptocurrency): void {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortColumn = column;
      this.sortDirection = true;
    }
    this.sortCryptocurrencies();
  }

  sortCryptocurrencies(): void {
    const direction = this.sortDirection ? 1 : -1;

    this.filteredCryptocurrencies.sort((a, b) => {
      const valueA = this.convertValue(a[this.sortColumn]);
      const valueB = this.convertValue(b[this.sortColumn]);

      if (valueA > valueB) {
        return direction;
      } else if (valueA < valueB) {
        return -direction;
      } else {
        return 0;
      }
    });
  }

  convertValue(value:any): number {
    return this.currencyService.convertValue(value, this.currentCurrency);
  }
  
  onSearchChange(searchTerm: string): void {
    this.filteredCryptocurrencies = this.searchService.filterItems(
      this.cryptocurrencies, 
      searchTerm, 
      ['name', 'symbol']
    );
    this.sortCryptocurrencies(); // Обновление сортировки после поиска
  }
}