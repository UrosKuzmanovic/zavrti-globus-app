import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((m) => m.AuthPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule)
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "trips",
    loadChildren: () =>
      import("./trips/trips.module").then((m) => m.TripsPageModule)
  },
  {
    path: "inquiries",
    loadChildren: () =>
      import("./inquiries/inquiries.module").then((m) => m.InquiriesPageModule),
    canLoad: [AuthGuard, AdminGuard],
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsPageModule)
  },
  {
    path: "terms-of-use",
    loadChildren: () =>
      import("./terms-of-use/terms-of-use.module").then(
        (m) => m.TermsOfUsePageModule
      )
  },
  {
    path: "about",
    loadChildren: () =>
      import("./about/about.module").then((m) => m.AboutPageModule)
  },
  {
    path: "inquiry-trips",
    loadChildren: () =>
      import("./inquiry-trips/inquiry-trips.module").then(
        (m) => m.InquiryTripsPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
