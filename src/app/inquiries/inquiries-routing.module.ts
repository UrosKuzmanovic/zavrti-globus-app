import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InquiriesPage } from './inquiries.page';

const routes: Routes = [
  {
    path: '',
    component: InquiriesPage
  },
  {
    path: 'inquiry',
    loadChildren: () => import('../inquiry/inquiry.module').then( m => m.InquiryPageModule)
  },
  {
    path: 'new-inquiry',
    loadChildren: () => import('../new-inquiry/new-inquiry.module').then( m => m.NewInquiryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquiriesPageRoutingModule {}
