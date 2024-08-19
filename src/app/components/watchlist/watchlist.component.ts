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

