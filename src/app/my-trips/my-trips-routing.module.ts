import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTripsPage } from './my-trips.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MyTripsPage,
    children: [
      {
        path: 'favorite-trips',
        children: [
          {
            path: '',
            // loadChildren: '../favorite-trips/favorite-trips.module#FavoriteTripsPageModule'
            loadChildren: () => import('../favorite-trips/favorite-trips.module').then(m => m.FavoriteTripsPageModule)
          }
        ]
      },
      {
        path: 'booked-trips',
        children: [
          {
            path: '',
            // loadChildren: '../booked-trips/booked-trips.module#BookedTripsPageModule'
            loadChildren: () => import('../booked-trips/booked-trips.module').then(m => m.BookedTripsPageModule)
          }
        ]
      }, 
      {
        path: '',
        redirectTo: '/trips/my-trips/tabs/favorite-trips',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/trips/my-trips/tabs/favorite-trips', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTripsPageRoutingModule { }