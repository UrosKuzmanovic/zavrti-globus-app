import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InquiryTripsPage } from './inquiry-trips.page';

const routes: Routes = [
  {
    path: '',
    component: InquiryTripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquiryTripsPageRoutingModule {}
