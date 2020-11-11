import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesDashPageRoutingModule } from './sales-dash-routing.module';

import { SalesDashPage } from './sales-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesDashPageRoutingModule
  ],
  declarations: [SalesDashPage]
})
export class SalesDashPageModule {}
