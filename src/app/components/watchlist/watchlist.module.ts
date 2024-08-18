import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistComponent } from './watchlist.component';


@NgModule({
  declarations: [
    WatchlistComponent
  ],
  imports: [
    CommonModule,
    WatchlistRoutingModule
  ],
  exports:[
    WatchlistComponent,
  ]
})
export class WatchlistModule { }
