import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
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
  defaultImgSrc = "../../assets/img/logo/zg.jpg";
  temperature: number;
  weatherIcon: string;
  isInquiry = false;
  flagSrc = "";
  submitetBy = "";

  tripSub: Subscription;
  favSub: Subscription;

  private _window: any = window;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private tripService: TripService,
    private favoriteTripsService: FavoriteTripsService,
    private authService: AuthService,
    private alertCtrl: AlertController
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
          if (this.trip.user.role === "user") this.isInquiry = true;
          else this.isInquiry = false;
          this.flagSrc = `https://www.countryflags.io/${trip.country.flagSrc}/flat/24.png`;
          this.submitetBy = `Ovaj upit je poslao/la korisnik ${trip.user.firstName} ${trip.user.lastName}`;
          console.log(trip);
          this.tripService
            .getWeather(this.trip.city)
            .subscribe((weather: any) => {
              console.log(weather);
              this.temperature = Math.round(weather.main.temp);
              this.weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
            });
          /*AppCenter.Analytics.trackEvent(
            "Trip",
            { City: trip.city ? trip.city : "", Country: trip.country.name },
            (a) => {
              console.log("Event tracked");
              this.alertCtrl
                .create({
                  header: "Tracking event!",
                  message: `This event has been tracked. ${a}`,
                  buttons: [
                    {
                      text: "OK",
                    },
                  ],
                })
                .then((alertEl) => {
                  return alertEl.present();
                });
            },
            (error) => {
              console.error(`error tracked: ${error}`);
              this.alertCtrl
                .create({
                  header: "Tracking event!",
                  message: `This event has been tracked. ${error}`,
                  buttons: [
                    {
                      text: "OK",
                    },
                  ],
                })
                .then((alertEl) => {
                  return alertEl.present();
                });
            }
          );*/
        });
      this.authService.userIsAuthenticated.subscribe((isLogged) => {
        this.isLogged = isLogged;
      });
      this.authService.userID.subscribe((userID) => {
        this.favSub = this.tripService
          .chechFavorite(userID, this.tripID)
          .subscribe((data) => {
            if (data != null) this.favorite = true;
            else this.favorite = false;
          });
        this.authService.userIsAdmin.subscribe((isAdmin) => {
          this.isAdmin = isAdmin;
        });
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
      )} ${yearFrom} - ${dayTo}. ${this.monthFormat(monthTo)} ${yearTo}.`;
    }
  }

  oneDateFormat(postFrom: Date) {
    var dayFrom = postFrom.getUTCDate();
    var monthFrom = postFrom.getUTCMonth() + 1;
    var yearFrom = postFrom.getUTCFullYear();

    return `${dayFrom}. ${this.monthFormat(monthFrom)} ${yearFrom}.`;
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

  addToFavorites() {
    this.authService.userID.subscribe((userID) => {
      this.tripService.addToFavorites(userID, this.tripID).subscribe(() => {
        this.favorite = true;
        this.favoriteTripsService.getFavorites(userID).subscribe();
        /*this._window.AppCenter.Analytics.trackEvent(
          "Saved trip",
          {
            City: this.trip.city ? this.trip.city : "",
            Country: this.trip.country.name,
          },
          () => {
            console.log("Event tracked");
          },
          (error) => {
            console.error(`error tracked: ${error}`);
          }
        );*/
      });
    });
  }

  removeFromFavorites() {
    this.authService.userID.subscribe((userID) => {
      this.tripService
        .removeFromFavorites(userID, this.tripID)
        .subscribe(() => {
          this.favorite = false;
          this.favoriteTripsService.getFavorites(userID).subscribe();
        });
    });
  }

  editTrip() {
    this.navCtrl.navigateForward(`/trips/trip/new-trip/${this.tripID}`);
  }
}
