import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InquiriesPage } from './inquiries.page';
import { AdminGuard } from '../auth/admin.guard';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InquiriesPage
  },
  {
    path: 'inquiry',
    loadChildren: () => import('../inquiry/inquiry.module').then( m => m.InquiryPageModule),
    canLoad: [AuthGuard, AdminGuard]
  },
  {
    path: 'new-inquiry',
    loadChildren: () => import('../new-inquiry/new-inquiry.module').then( m => m.NewInquiryPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquiriesPageRoutingModule {}
