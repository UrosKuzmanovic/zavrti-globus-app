import { Component, OnInit, OnDestroy } from "@angular/core";

import { TripsService } from "./trips.service";
import { Subscription } from "rxjs";
import { Trip } from "../models/trip.model";

@Component({
  selector: "app-trips",
  templateUrl: "./trips.page.html",
  styleUrls: ["./trips.page.scss"],
})
export class TripsPage implements OnInit, OnDestroy {
  trips: Trip[];
  tripsCopy: Trip[];
  private tripsSub: Subscription;

  showSearchBar = false;
  showFilter = false;
  selectedCountry = "all";
  defaultImg = "../../assets/img/trips/1.jpg";

  private webWiew: any = window;

  constructor(private tripsService: TripsService) {}

  ngOnInit() {
    this.tripsSub = this.tripsService.trips.subscribe(
      (trips) => {
        this.trips = trips;
        this.tripsCopy = trips;
      },
      (error) => {
        console.log("Doslo je do greske");
        console.log(error);
      }
    );
    /*this.webWiew.AppCenter.Analytics.trackEvent(
      "All trips",
      {},
      () => {
        console.log("Event tracked");
      },
      (error) => {
        console.error(`error tracked: ${error}`);
      }
    );*/
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

  onSearchChange($event) {
    this.trips = this.tripsCopy;
    const search: string = $event.detail.value;
    this.trips = this.trips.filter(
      (trip) => trip.city.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }
}
