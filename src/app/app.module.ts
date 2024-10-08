import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WalletModule } from './components/wallet/wallet.module';
import { WatchlistModule } from './components/watchlist/watchlist.module';
import { ConverterModule } from './components/converter/converter.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ThemeService } from './service/theme.service';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    ConverterModule,
    WatchlistModule,
    WalletModule,
    DashboardModule,
    ChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
