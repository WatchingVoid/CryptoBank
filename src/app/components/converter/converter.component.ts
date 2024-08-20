import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/service/crypto.service';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  cryptocurrencies: any[] = [];
  fromCurrency: string = 'BTC';
  toCurrency: string = 'ETH';
  amount: number = 1;
  result: number = 0;
  theme: string = 'light';

  constructor(private cryptoService: CryptoService,  private themeService: ThemeService) {}

  ngOnInit(): void {
    this.cryptoService.getCryptoListings().subscribe(data => {
      this.cryptocurrencies = data.data.map((item: any) => ({
        symbol: item.symbol,
        price: item.quote.USD.price
      }));
    });
    this.themeService.getTheme().subscribe(theme => {
      this.theme = theme;
    });
  }

  convert(): void {
    const fromCrypto = this.cryptocurrencies.find(crypto => crypto.symbol === this.fromCurrency);
    const toCrypto = this.cryptocurrencies.find(crypto => crypto.symbol === this.toCurrency);
    if (fromCrypto && toCrypto) {
      this.result = (this.amount * fromCrypto.price) / toCrypto.price;
    }
  }
}
