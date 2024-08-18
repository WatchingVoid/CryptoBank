import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/service/crypto.service';

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

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.cryptoService.getCryptoListings().subscribe(data => {
      this.cryptocurrencies = data.data.map((item: any) => ({
        symbol: item.symbol,
        price: item.quote.USD.price
      }));
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
