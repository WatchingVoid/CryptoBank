import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ConverterComponent } from './components/converter/converter.component';
import { WatchlistModule } from './components/watchlist/watchlist.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

const routes: Routes = [
  {
    path: '',
    component: WatchlistComponent // Центральный компонент Watchlist
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    outlet: 'panel' // Отображается в правой панели
  },
  {
    path: 'wallet',
    component: WalletComponent,
    outlet: 'panel', // Отображается в правой панели
    children: [
      {
        path: 'convert',
        component: ConverterComponent // Конвертер откроется внутри Wallet
      }
    ]
  },
  { path: '**', redirectTo: '' } // Перенаправление на watchlist по умолчанию
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
