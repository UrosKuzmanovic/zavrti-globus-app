import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteTripsPageRoutingModule } from './favorite-trips-routing.module';

import { FavoriteTripsPage } from './favorite-trips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteTripsPageRoutingModule
  ],
  declarations: [FavoriteTripsPage]
})
export class FavoriteTripsPageModule {}
