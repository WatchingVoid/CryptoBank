import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistComponent } from './watchlist.component';
import { SharedModule } from "../../shared/shared.module";
import { KENDO_CHARTS, SparklineComponent} from '@progress/kendo-angular-charts';
import { KENDO_SPARKLINE } from '@progress/kendo-angular-charts';
import { ChartsModule } from "@progress/kendo-angular-charts";
@NgModule({
  declarations: [
    WatchlistComponent
  ],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    SharedModule,
    SparklineComponent,
    ChartsModule
],
  exports:[
    WatchlistComponent,
  ]
})
export class WatchlistModule { }
