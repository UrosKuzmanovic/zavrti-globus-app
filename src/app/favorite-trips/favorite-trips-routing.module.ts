import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteTripsPage } from './favorite-trips.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteTripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteTripsPageRoutingModule {}
