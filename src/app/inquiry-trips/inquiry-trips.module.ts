import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InquiryTripsPageRoutingModule } from './inquiry-trips-routing.module';

import { InquiryTripsPage } from './inquiry-trips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InquiryTripsPageRoutingModule
  ],
  declarations: [InquiryTripsPage]
})
export class InquiryTripsPageModule {}
