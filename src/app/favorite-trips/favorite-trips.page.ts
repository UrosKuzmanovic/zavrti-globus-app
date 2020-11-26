import { Component, OnInit, OnDestroy } from "@angular/core";
import { FavoriteTripsService } from "./favorite-trips.service";
import { Subscription } from "rxjs";
import { TripService } from "../trip/trip.service";
import { Trip } from "../models/trip.model";
import { AuthService } from "../auth/auth.service";
import { OtherServicesService } from "../services/other-services.service";

@Component({
  selector: "app-favorite-trips",
  templateUrl: "./favorite-trips.page.html",
  styleUrls: ["./favorite-trips.page.scss"],
})
export class FavoriteTripsPage implements OnInit, OnDestroy {
  favorites: Trip[] = [];
  favSub: Subscription;
  showList = false;
  defaultImg = "../../assets/img/logo/zg.jpg";

  constructor(
    private favoriteTripsService: FavoriteTripsService,
    private tripServce: TripService,
    private authService: AuthService,
    private otherServices: OtherServicesService
  ) {}

  ngOnInit() {
    /*this.favSub =*/ this.favoriteTripsService.favorites.subscribe((favs) => {
      this.favorites = favs;
      if (this.favorites.length > 0) this.showList = true;
      else this.showList = false;
    });
  }

  ionViewWillEnter() {
    console.log("enter");
    this.authService.userID.subscribe((userID) => {
      this.favoriteTripsService.getFavorites(userID).subscribe();
    });
  }

  ngOnDestroy() {
    if (this.favSub) this.favSub.unsubscribe();
  }

  removeFavorite(tripID: number) {
    this.authService.userID.subscribe((userID) => {
      this.tripServce.removeFromFavorites(userID, tripID).subscribe(() => {
        console.log(`Trip id je ${tripID}`);
        this.favoriteTripsService.getFavorites(userID).subscribe();
        console.log(`uklonio ${tripID}`);
      });
    });
  }
}
