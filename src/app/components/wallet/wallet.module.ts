import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletComponent } from './wallet.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterLink } from '@angular/router';
import { ConverterModule } from '../converter/converter.module';

@NgModule({
  declarations: [WalletComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterLink,
    ConverterModule
  ],
  exports: [WalletComponent]
})
export class WalletModule { }
