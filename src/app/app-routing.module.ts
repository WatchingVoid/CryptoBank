import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ConverterComponent } from './components/converter/converter.component';

const routes: Routes = [
  { path: '', component: WatchlistComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'converter', component: ConverterComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
