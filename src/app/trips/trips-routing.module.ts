import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripsPage } from './trips.page';
import { MyTripsPage } from '../my-trips/my-trips.page';

const routes: Routes = [
  {
    path: '',
    component: TripsPage
  },
  {
    path: 'trip',
    loadChildren: () => import('../trip/trip.module').then( m => m.TripPageModule)
  },
  {
    path: 'my-trips',
    loadChildren: () => import('../my-trips/my-trips.module').then( m => m.MyTripsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsPageRoutingModule {}
