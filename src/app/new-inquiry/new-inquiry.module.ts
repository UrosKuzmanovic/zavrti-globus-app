import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

import { IonicModule } from '@ionic/angular';

import { NewInquiryPageRoutingModule } from './new-inquiry-routing.module';

import { NewInquiryPage } from './new-inquiry.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NewInquiryPageRoutingModule,
    FormsModule,
    IonicSelectableModule
  ],
  declarations: [NewInquiryPage]
})
export class NewInquiryPageModule {}
