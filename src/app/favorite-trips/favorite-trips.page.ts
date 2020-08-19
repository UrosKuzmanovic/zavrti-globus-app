import { Component, OnInit, OnDestroy } from "@angular/core";
import { FavoriteTripsService } from "./favorite-trips.service";
import { Subscription } from "rxjs";
import { TripService } from '../trip/trip.service';
import { Trip } from '../models/trip.model';

@Component({
  selector: "app-favorite-trips",
  templateUrl: "./favorite-trips.page.html",
  styleUrls: ["./favorite-trips.page.scss"],
})
export class FavoriteTripsPage implements OnInit, OnDestroy {
  favorites: Trip[] = [];
  favSub: Subscription;
  showList = false;
  userID = 1;
  defaultImg = "../../assets/img/trips/1.jpg";

  constructor(private favoriteTripsService: FavoriteTripsService, private tripServce: TripService) {}

  ngOnInit() {
    this.favSub = this.favoriteTripsService.favorites.subscribe((favs) => {
      console.log('sub');
      this.favorites = favs;
      console.log(this.favorites);
      if (this.favorites.length > 0) this.showList = true;
      else this.showList = false;
    }); 
  }

  ionViewWillEnter() {
    console.log('enter');
    this.favoriteTripsService.getFavorites(this.userID).subscribe();
  }

  ngOnDestroy() {
    if (this.favSub) this.favSub.unsubscribe();
  }

  removeFavorite(tripID: number){
    this.tripServce.removeFromFavorites(this.userID, tripID).subscribe(() => {
      this.favoriteTripsService.getFavorites(this.userID).subscribe();
      console.log(`uklonio ${tripID}`);
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
      )} ${yearFrom} - ${dayFrom}. ${this.monthFormat(monthFrom)} ${yearFrom}.`;
    }
  }

  monthFormat(month: number) {
    switch (month) {
      case 1:
        return "januar";
      case 2:
        return "februar";
      case 3:
        return "mart";
      case 4:
        return "april";
      case 5:
        return "maj";
      case 6:
        return "jun";
      case 7:
        return "jul";
      case 8:
        return "avgust";
      case 9:
        return "septembar";
      case 10:
        return "oktobar";
      case 11:
        return "novembar";
      case 12:
        return "decembar";
      default:
        return "null";
    }
  }
}
