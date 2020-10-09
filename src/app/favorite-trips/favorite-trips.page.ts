import { Component, OnInit, OnDestroy } from "@angular/core";
import { FavoriteTripsService } from "./favorite-trips.service";
import { Subscription } from "rxjs";
import { TripService } from "../trip/trip.service";
import { Trip } from "../models/trip.model";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-favorite-trips",
  templateUrl: "./favorite-trips.page.html",
  styleUrls: ["./favorite-trips.page.scss"],
})
export class FavoriteTripsPage implements OnInit, OnDestroy {
  favorites: Trip[] = [];
  favSub: Subscription;
  showList = false;
  //userID = 1;
  defaultImg = "../../assets/img/trips/1.jpg";

  constructor(
    private favoriteTripsService: FavoriteTripsService,
    private tripServce: TripService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    /*this.favSub =*/ this.favoriteTripsService.favorites.subscribe((favs) => {
      console.log("sub");
      this.favorites = favs;
      console.log(this.favorites);
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

  dateFormat(dateFrom: Date, dateTo: Date) {
    var dayFrom = dateFrom.getUTCDate();
    var monthFrom = dateFrom.getUTCMonth() + 1;
    var yearFrom = dateFrom.getUTCFullYear();

    var dayTo = dateTo.getUTCDate();
    var monthTo = dateTo.getUTCMonth() + 1;
    var yearTo = dateTo.getUTCFullYear();

    if (yearFrom === yearTo) {
      if (monthFrom === monthTo) {
        if (dayFrom === dayTo) {
          return `${dayFrom}. ${this.monthFormat(monthFrom)} ${yearFrom}.`;
        } else {
          return `${dayFrom}-${dayTo}. ${this.monthFormat(
            monthFrom
          )} ${yearFrom}.`;
        }
      } else {
        return `${dayFrom}. ${this.monthFormat(
          monthFrom
        )} - ${dayTo}. ${this.monthFormat(monthTo)} ${yearFrom}.`;
      }
    } else {
      return `${dayFrom}. ${this.monthFormat(
        monthFrom
      )} ${yearFrom} - ${dayTo}. ${this.monthFormat(monthTo)} ${yearTo}.`;
    }
  }

  monthFormat(month: number) {
    switch (month) {
      case 1:
        return "jan";
      case 2:
        return "feb";
      case 3:
        return "mar";
      case 4:
        return "apr";
      case 5:
        return "maj";
      case 6:
        return "jun";
      case 7:
        return "jul";
      case 8:
        return "avg";
      case 9:
        return "sep";
      case 10:
        return "okt";
      case 11:
        return "nov";
      case 12:
        return "dec";
      default:
        return "null";
    }
  }
}
