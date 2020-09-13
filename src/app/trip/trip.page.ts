import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Trip } from "../models/trip.model";
import { TripService } from "./trip.service";
import { Subscription } from "rxjs";
import { FavoriteTripsService } from "../favorite-trips/favorite-trips.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-trip",
  templateUrl: "./trip.page.html",
  styleUrls: ["./trip.page.scss"],
})
export class TripPage implements OnInit, OnDestroy {
  isLogged = false;
  isAdmin = false;
  favorite = false;
  desc =
    "Aranžman ne uključuje:\n•Transfer aerodrom-hotel-aerodrom.\n---------------------------------------------\nCena aranžmana formirana je na dan objavljivanja ponude.\n\nZa sve nedoumice, pitanja i prijave javite nam se privatnom porukom ili na mail zavrtiglobus@gmail.com";
  tripID: number;
  trip: Trip;
  defaultImgSrc = "../../assets/img/trips/1.jpg";
  temperature: number;
  weatherIcon: string;

  tripSub: Subscription;
  favSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private tripService: TripService,
    private favoriteTripsService: FavoriteTripsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("tripID")) {
        this.navCtrl.navigateBack("/trips");
        return;
      }
      this.tripID = +paramMap.get("tripID");
      this.tripSub = this.tripService
        .fetchTripByID(this.tripID)
        .subscribe((trip) => {
          this.trip = trip;
          console.log(trip);
          this.tripService.getWeather(this.trip.city).subscribe((weather) => {
            console.log(weather);
            //this.temperature = Math.round(weather.main.temp);
            //this.weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
          });
        });
      this.authService.userIsAuthenticated.subscribe((isLogged) => {
        this.isLogged = isLogged;
      });
      this.authService.userID.subscribe(userID => {
        this.favSub = this.tripService
        .chechFavorite(userID, this.tripID)
        .subscribe((data) => {
          if (data != null) this.favorite = true;
          else this.favorite = false;
        });
        this.authService.userIsAdmin.subscribe(isAdmin => {
          this.isAdmin = isAdmin;
        })
      });
    });
  }

  ngOnDestroy() {
    this.tripSub.unsubscribe();
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
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

  addToFavorites() {
    this.authService.userID.subscribe((userID) => {
      this.tripService.addToFavorites(userID, this.tripID).subscribe(() => {
        this.favorite = true;
        this.favoriteTripsService.getFavorites(userID).subscribe();
      });
    });
  }

  removeFromFavorites() {
    this.authService.userID.subscribe(userID => {
      this.tripService
      .removeFromFavorites(userID, this.tripID)
      .subscribe(() => {
        this.favorite = false;
        this.favoriteTripsService.getFavorites(userID).subscribe();
      });
    })
  }

  editTrip() {
    this.navCtrl.navigateForward(`/trips/trip/new-trip/${this.tripID}`);
  }
}
