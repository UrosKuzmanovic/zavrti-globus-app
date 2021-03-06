import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NewInquiryService } from "./new-inquiry.service";
import { Trip } from "../models/trip.model";
import { Country } from "../models/country.model";
import { Airport } from "../models/airport.model";
import { User } from "../models/user.model";
import { AuthService } from "../auth/auth.service";
import { take } from "rxjs/operators";
import { OtherServicesService } from "../services/other-services.service";
import { NavController } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";

@Component({
  selector: "app-new-inquiry",
  templateUrl: "./new-inquiry.page.html",
  styleUrls: ["./new-inquiry.page.scss"],
})
export class NewInquiryPage implements OnInit {
  @ViewChild("selectCountry", { static: false })
  selectCountry: IonicSelectableComponent;

  minDate: string = new Date().toISOString();
  maxDate: any = new Date().getFullYear() + 3;
  isAdmin: boolean = false;

  countries: Country[];
  selectedCountry: Country;

  constructor(
    private newInquiryService: NewInquiryService,
    private authService: AuthService,
    private router: NavController,
    private otherServices: OtherServicesService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.authService.userIsAdmin.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.newInquiryService.fetchCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  onSubmit(f: NgForm) {
    this.authService.userID.pipe(take(1)).subscribe((userID) => {
      if (!userID) {
        return;
      } else {
        this.newInquiryService
          .onSubmit(
            new Trip(
              null,
              f.value.city.trim(),
              new Country(this.selectedCountry.countryID, null, null, null),
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
              new User(userID, null, null, null, null, null, null)
            )
          )
          .subscribe(
            () => {
              this.otherServices.showAlert(
                "Slanje upita",
                "Upit je uspešno poslat!"
              );
              this.router.navigateForward("/home");
            },
            (err) => {
              this.otherServices.showAlert(
                "Slanje upita",
                "Došlo je do greške prilikom slanja upita."
              );
            }
          );
      }
    });
  }

  searchCountries(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    let text = this.otherServices.convertLatinicWords(event.text.trim());

    event.component.startSearch();

    if (!text) {
      event.component.items = this.countries;
      event.component.endSearch();
      return;
    }

    event.component.items = this.countries.filter((country) => {
      return (
        this.otherServices.convertLatinicWords(country.name).indexOf(text) !==
        -1
      );
    });
    event.component.endSearch();
  }
}
