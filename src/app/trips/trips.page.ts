import { Component, OnInit, OnDestroy } from "@angular/core";

import { TripsService } from "./trips.service";
import { Subscription } from "rxjs";
import { Trip } from '../models/trip.model';

@Component({
  selector: "app-trips",
  templateUrl: "./trips.page.html",
  styleUrls: ["./trips.page.scss"],
})
export class TripsPage implements OnInit, OnDestroy {
  trips: Trip[];
  private tripsSub: Subscription;

  showSearchBar = false;
  showFilter = false;
  selectedCountry = "all";
  defaultImg = "../../assets/img/trips/1.jpg";

  constructor(private tripsService: TripsService) {}

  ngOnInit() {
    this.tripsSub = this.tripsService.trips.subscribe((trips) => {
      this.trips = trips;
    });
  }

  ngOnDestroy() {
    if (this.tripsSub) {
      this.tripsSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.tripsService.fetchTrips().subscribe();
  }

  ionViewDidLeave() {
    this.showSearchBar = false;
    this.showFilter = false;
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    this.showFilter = false;
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    this.showSearchBar = false;
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
