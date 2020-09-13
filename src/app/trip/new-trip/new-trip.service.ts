import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FetchedTrip } from "src/app/models/modifiedModels/fetchedTrip.model";
import { map, tap } from "rxjs/operators";
import { Trip } from "src/app/models/trip.model";
import { Country } from "src/app/models/country.model";
import { Airport } from "src/app/models/airport.model";
import { User } from "src/app/models/user.model";
import { FetchedCountries } from "src/app/models/modifiedModels/fetchedCountries.model";
import { Continent } from "src/app/models/continent.model";

@Injectable({
  providedIn: "root",
})
export class NewTripService {
  constructor(private http: HttpClient) {}

  fetchTripByID(id: number) {
    return this.http
      .get<FetchedTrip>(`http://localhost:5000/api/trips/trip/${id}`)
      .pipe(
        map((fetchedTrip) => {
          return new Trip(
            fetchedTrip.tripID,
            fetchedTrip.city,
            new Country(
              fetchedTrip.countryID,
              fetchedTrip.countryName,
              null, // treba staviti kontinent
              null // treba staviti zastavu
            ),
            fetchedTrip.price,
            new Date(fetchedTrip.travelDate),
            new Date(fetchedTrip.returnDate),
            new Date(fetchedTrip.postDate),
            new Airport(fetchedTrip.airportID, fetchedTrip.airportName),
            fetchedTrip.baggage,
            fetchedTrip.hotel,
            fetchedTrip.hotelLatitude,
            fetchedTrip.hotelLongitude,
            fetchedTrip.meal,
            fetchedTrip.quote,
            fetchedTrip.author,
            fetchedTrip.description,
            fetchedTrip.imageSrc,
            new User(
              fetchedTrip.userID,
              null,
              null,
              fetchedTrip.firstName,
              fetchedTrip.lastName,
              null,
              fetchedTrip.role
            )
          );
        })
      );
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

  fetchAirports() {
    return this.http.get<Airport[]>(`http://localhost:5000/api/airports`).pipe(
      map((fetchedAirports) => {
        const airports: Airport[] = [];
        fetchedAirports.forEach((fetchedAirport) => {
          airports.push(fetchedAirport);
        });
        return airports;
      })
    );
  }

  
  insertTrip(trip: Trip){
    return this.http
      .post(
        "http://localhost:5000/api/trips/new-trip",
        {
          city: trip.city,
          countryID: trip.country.countryID,
          price: trip.price,
          travelDate: trip.travelDate,
          returnDate: trip.returnDate,
          postDate: trip.postDate,
          airport: trip.airport.airportID,
          baggage: trip.baggage,
          hotel: trip.hotel,
          meal: trip.meal,
          quote: trip.quote,
          author: trip.author,
          description: trip.description,
          imageSrc: trip.imageSrc,
          userID: trip.user.userID,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
  }

  updateTrip(trip: Trip){
    return this.http
      .post(
        "http://localhost:5000/api/trips/update-trip",
        {
          tripID: trip.tripID,
          city: trip.city,
          countryID: trip.country.countryID,
          price: trip.price,
          travelDate: trip.travelDate,
          returnDate: trip.returnDate,
          postDate: trip.postDate,
          airport: trip.airport.airportID,
          baggage: trip.baggage,
          hotel: trip.hotel,
          meal: trip.meal,
          quote: trip.quote,
          author: trip.author,
          description: trip.description,
          imageSrc: trip.imageSrc,
          userID: trip.user.userID,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
  }
}
