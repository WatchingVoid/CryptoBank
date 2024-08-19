import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletComponent } from './wallet.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [WalletComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [WalletComponent]
})
export class WalletModule { }
