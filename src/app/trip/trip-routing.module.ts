import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripPage } from './trip.page';

const routes: Routes = [
  
  {
    path: 'new-trip/:tripID',
    loadChildren: () => import('../trip/new-trip/new-trip.module').then( m => m.NewTripPageModule)
  },
  {
    path: 'new-trip',
    loadChildren: () => import('../trip/new-trip/new-trip.module').then( m => m.NewTripPageModule)
  },
  {
    path: 'edit-trip',
    loadChildren: () => import('../trip/edit-trip/edit-trip.module').then( m => m.EditTripPageModule)
  },
  {
    path: ':tripID',
    component: TripPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripPageRoutingModule {}
