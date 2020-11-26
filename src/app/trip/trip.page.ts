import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { Trip } from "../models/trip.model";
import { TripService } from "./trip.service";
import { Subscription } from "rxjs";
import { FavoriteTripsService } from "../favorite-trips/favorite-trips.service";
import { AuthService } from "../auth/auth.service";
import { OtherServicesService } from "../services/other-services.service";

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
    private otherServices: OtherServicesService,
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

  deleteTrip() {
    console.log("delete");

    this.alertCtrl
      .create({
        message: "Da li ste sigurni da želite da obrišete ovo putovanje?",
        buttons: [
          {
            text: "Ne",
            role: "cancel",
          },
          {
            text: "Da",
            handler: () => {
              this.tripService.deleteTrip(this.trip).subscribe(
                () => {
                  this.otherServices.showAlert(
                    "Brisanje putovanja",
                    "Putovanje je uspešno obrisano!"
                  );
                  this.navCtrl.pop();
                },
                (err) => {
                  this.otherServices.showAlert(
                    "Brisanje putovanja",
                    "Došlo je do greške prilikom brisanja purovanja"
                  );
                }
              );
            },
          },
        ],
      })
      .then((alertEl) => {
        return alertEl.present();
      });
  }
}
