import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MyTripsPage } from "./my-trips.page";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  {
    path: "tabs",
    component: MyTripsPage,
    children: [
      {
        path: "favorite-trips",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../favorite-trips/favorite-trips.module").then(
                (m) => m.FavoriteTripsPageModule
              ),
            canLoad: [AuthGuard],
          },
        ],
      },
      {
        path: "booked-trips",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../booked-trips/booked-trips.module").then(
                (m) => m.BookedTripsPageModule
              ),
            canLoad: [AuthGuard],
          },
        ],
      },
      {
        path: "inquiry-trips",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../inquiry-trips/inquiry-trips.module").then(
                (m) => m.InquiryTripsPageModule
              ),
            canLoad: [AuthGuard],
          },
        ],
      },
      {
        path: "",
        redirectTo: "/trips/my-trips/tabs/favorite-trips",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/trips/my-trips/tabs/favorite-trips",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTripsPageRoutingModule {}
