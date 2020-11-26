import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Trip } from "src/app/models/trip.model";
import { Subscription } from "rxjs";
import { NewTripService } from "./new-trip.service";
import { Country } from "src/app/models/country.model";
import { Airport } from "src/app/models/airport.model";
import { NgForm } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-new-trip",
  templateUrl: "./new-trip.page.html",
  styleUrls: ["./new-trip.page.scss"],
})
export class NewTripPage implements OnInit {
  @ViewChild("form", { static: false }) form: NgForm;
  tripID: number;
  trip: Trip = new Trip(
    null,
    null,
    new Country(null, null, null, null),
    null,
    null,
    null,
    null,
    new Airport(null, null),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    new User(null, null, null, null, null, null, null)
  );
  countries: Country[];
  airports: Airport[];
  dateFrom: string;
  dateTo: string;

  tripSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private newTripService: NewTripService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has("tripID")) {
        this.tripID = +paramMap.get("tripID");
        this.tripSub = this.newTripService
          .fetchTripByID(this.tripID)
          .subscribe((trip) => {
            this.trip = trip;
            console.log(this.trip);
            console.log(this.trip.postDate.toISOString());
            this.dateFrom = this.dateFormat(this.trip.travelDate);
            this.dateTo = this.dateFormat(this.trip.returnDate);
          });
      }
    });
    this.newTripService.fetchCountries().subscribe((countries) => {
      this.countries = countries;
    });
    this.newTripService.fetchAirports().subscribe((airports) => {
      this.airports = airports;
    });
  }

  ionViewWillLeave() {
    this.trip = new Trip(
      null,
      null,
      new Country(null, null, null, null),
      null,
      null,
      null,
      null,
      new Airport(null, null),
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      new User(null, null, null, null, null, null, null)
    );
  }

  onSubmit(f: NgForm) {
    this.authService.userID.subscribe((userID) => {
      console.log(userID);

      const newTrip = new Trip(
        this.trip ? this.trip.tripID : null,
        f.value.city,
        new Country(f.value.country, null, null, null),
        f.value.price,
        f.value.travelDate,
        f.value.returnDate,
        this.trip.tripID ? this.trip.postDate : new Date(),
        new Airport(f.value.airport, null),
        f.value.baggage,
        f.value.hotel,
        null,
        null,
        f.value.meal,
        f.value.quote,
        f.value.author,
        f.value.description,
        f.value.imageSrc,
        new User(userID, null, null, null, null, null, null)
      );
      console.log(newTrip);
      if (this.trip.tripID) {
        this.newTripService.updateTrip(newTrip).subscribe(() => {
          console.log("Apdejtovao");
        });
      } else {
        this.newTripService.insertTrip(newTrip).subscribe(() => {
          console.log("Ubacio novo");
        });
      }
    });
  }

  clearFields() {
    this.form.reset();
  }

  dateFormat(date: Date) {
    return new Date(
      date.setHours(date.getHours() - date.getTimezoneOffset() / 60)
    )
      .toISOString()
      .split("T")[0];
  }

  returnFlag(country: Country) {
    return `https://www.countryflags.io/${country.flagSrc}/flat/24.png`;
  }
}
