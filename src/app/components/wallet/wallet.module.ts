import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    FormsModule,
    SharedModule
],
  exports:[
    WalletComponent
  ]
})
export class WalletModule { }
