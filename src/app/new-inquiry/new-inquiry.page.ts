import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NewInquiryService } from "./new-inquiry.service";
import { Trip } from "../models/trip.model";
import { Country } from "../models/country.model";
import { Airport } from "../models/airport.model";
import { User } from "../models/user.model";
import { AuthService } from "../auth/auth.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-new-inquiry",
  templateUrl: "./new-inquiry.page.html",
  styleUrls: ["./new-inquiry.page.scss"],
})
export class NewInquiryPage implements OnInit {
  minDate: string = new Date().toISOString();
  maxDate: any = new Date().getFullYear() + 3;

  countries: Country[];

  constructor(
    private newInquiryService: NewInquiryService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.newInquiryService.fetchCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  onSubmit(f: NgForm) {
    console.log(f);
    this.authService.userID.pipe(take(1)).subscribe((userID) => {
      if (!userID) {
        return;
      } else {
        this.newInquiryService.onSubmit(
          new Trip(
            null,
            f.value.city.trim(),
            new Country(f.value.country, null, null, null),
            f.value.price,
            f.value.travelDate,
            f.value.returnDate,
            new Date(),
            new Airport(null, null),
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            f.value.description.trim(),
            null,
            new User(userID, null, null, null, null, null, null) // treba korisnik
          )
        );
      }
    });
  }
}
