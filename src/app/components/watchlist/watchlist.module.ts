import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistComponent } from './watchlist.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    WatchlistComponent
  ],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    SharedModule
],
  exports:[
    WatchlistComponent,
  ]
})
export class WatchlistModule { }
