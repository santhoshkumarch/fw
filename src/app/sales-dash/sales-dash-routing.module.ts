import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesDashPage } from './sales-dash.page';

const routes: Routes = [
  {
    path: '',
    component: SalesDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesDashPageRoutingModule {}
