import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { ConverterComponent } from './components/converter/converter.component';
import { WalletComponent } from './components/wallet/wallet.component';

const routes: Routes = [
  { path: '', redirectTo: '/watchlist', pathMatch: 'full' },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'converter', component: ConverterComponent },
  { path: 'wallet', component: WalletComponent },
  { path: '**', redirectTo: '/watchlist' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
