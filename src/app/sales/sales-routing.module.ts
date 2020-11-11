import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesPage } from './sales.page';

const routes: Routes = [
  {
    path: '',
    component: SalesPage,
    children: [
      {
        path: 'up',
        loadChildren: () => import('../user-profile/user-profile.module').then(m => m.UserProfilePageModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('../sales-dash/sales-dash.module').then(m => m.SalesDashPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('../payments/payments.module').then(m => m.PaymentsPageModule)
      },
      {
        path: '',
        redirectTo: '/sales/up',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesPageRoutingModule {}
