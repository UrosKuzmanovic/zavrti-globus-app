import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";

import { TripsService } from "./trips.service";
import { Subscription } from "rxjs";
import { Trip } from "../models/trip.model";
import { OtherServicesService } from "../services/other-services.service";
import { Country } from "../models/country.model";
import { IonicSelectableComponent } from "ionic-selectable";

@Component({
  selector: "app-trips",
  templateUrl: "./trips.page.html",
  styleUrls: ["./trips.page.scss"],
})
export class TripsPage implements OnInit, OnDestroy {
  @ViewChild("selectCountry", { static: false })
  selectCountry: IonicSelectableComponent;

  trips: Trip[];
  tripsFull: Trip[];
  tripsSearched: Trip[];
  countries: Country[];
  selectedCountries: Country[] = [];
  search: string = "";
  private tripsSub: Subscription;
  showSearchBar = false;
  showFilter = false;
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
        this.tripsFull = trips;
      },
      (error) => {
        console.log("Doslo je do greske");
        console.log(error);
      }
    );
    this.tripsService.fetchCountries().subscribe((countries) => {
      this.countries = countries;
    });
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
    this.search = $event.detail.value;
    this.filterTrips(this.search, this.selectedCountries);
  }

  confirm() {
    this.selectCountry.confirm();
    this.selectCountry.close();
    this.filterTrips(this.search, this.selectedCountries);
  }

  clear() {
    this.selectCountry.clear();
    this.selectCountry.close();
    this.filterTrips(this.search, this.selectedCountries);
  }

  filterTrips(text: string, countries: Country[]) {
    this.trips = this.tripsFull;
    if (countries.length > 0) {
      this.trips = [];
      this.tripsFull.forEach((trip) => {
        this.selectedCountries.forEach((country) => {
          if (trip.country.countryID === country.countryID) {
            this.trips.push(trip);
          }
        });
      });
    }
    if (text.length > 0) {
      this.trips = this.trips.filter(
        (trip) =>
          trip.city.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      );
    }
  }
}
