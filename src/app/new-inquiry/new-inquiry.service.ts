import { Injectable } from "@angular/core";
import { Trip } from "../models/trip.model";
import { HttpClient } from "@angular/common/http";
import { tap, map } from "rxjs/operators";
import { Country } from "../models/country.model";
import { FetchedCountries } from "../models/modifiedModels/fetchedCountries.model";
import { Continent } from "../models/continent.model";

@Injectable({
  providedIn: "root",
})
export class NewInquiryService {
  constructor(private http: HttpClient) {}

  onSubmit(trip: Trip) {
    console.log(trip);

    return this.http
      .post(
        "http://localhost:5000/api/trips/new-inquiry",
        {
          city: trip.city,
          countryID: trip.country.countryID,
          travelDate: trip.travelDate,
          returnDate: trip.returnDate,
          postDate: trip.postDate,
          price: trip.price,
          description: trip.description,
          userID: trip.user.userID,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .subscribe();
  }

  fetchCountries() {
    return this.http
      .get<FetchedCountries[]>(`http://localhost:5000/api/countries`)
      .pipe(
        map((fetchedCountries) => {
          const countries: Country[] = [];
          fetchedCountries.forEach((fetchedCountry) => {
            countries.push(
              new Country(
                fetchedCountry.countryID,
                fetchedCountry.countryName,
                new Continent(
                  fetchedCountry.continentID,
                  fetchedCountry.continentName
                ),
                fetchedCountry.flagSrc
              )
            );
          });
          return countries;
        })
      );
  }
}
