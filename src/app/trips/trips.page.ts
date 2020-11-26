import { Component, OnInit, OnDestroy } from "@angular/core";

import { TripsService } from "./trips.service";
import { Subscription } from "rxjs";
import { Trip } from "../models/trip.model";
import { OtherServicesService } from "../services/other-services.service";

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

  constructor(
    private tripsService: TripsService,
    private otherServices: OtherServicesService
  ) {}

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

  onSearchChange($event) {
    this.trips = this.tripsCopy;
    const search: string = $event.detail.value;
    this.trips = this.trips.filter(
      (trip) => trip.city.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }
}
