import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTripPageRoutingModule } from './new-trip-routing.module';

import { NewTripPage } from './new-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTripPageRoutingModule
  ],
  declarations: [NewTripPage]
})
export class NewTripPageModule {}
