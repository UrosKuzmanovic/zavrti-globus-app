import { Injectable } from "@angular/core";
import { Trip } from "../models/trip.model";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { take, filter, map, tap, switchMap } from "rxjs/operators";
import { Country } from "../models/country.model";
import { User } from "../models/user.model";
import { Airport } from "../models/airport.model";
import { FetchedTrip } from "../models/modifiedModels/fetchedTrip.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TripService {
  private _trip = new BehaviorSubject<Trip>(null);
  private _favorite = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) {}

  get trip() {
    return this._trip.asObservable();
  }

  fetchTripByID(id: number) {
    return this.http
      .get<FetchedTrip>(
        `http://${environment.ip_adress}:${environment.port}/api/trips/trip/${id}`
      )
      .pipe(
        map((fetchedTrip) => {
          return new Trip(
            fetchedTrip.tripID,
            fetchedTrip.city,
            new Country(
              fetchedTrip.countryID,
              fetchedTrip.countryName,
              null, // treba staviti kontinent
              fetchedTrip.countryFlagSrc
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
        }),
        tap((trip) => {
          this._trip.next(trip);
        })
      );
  }

  addToFavorites(userID: number, tripID: number) {
    return this.http.post(
      `http://${environment.ip_adress}:${environment.port}/api/trips/trip/favorite`,
      {
        user: userID,
        trip: tripID,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  removeFromFavorites(userID: number, tripID: number) {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      body: {
        user: userID,
        trip: tripID,
      },
    };
    return this.http.delete(
      `http://${environment.ip_adress}:${environment.port}/api/trips/trip/favorite`,
      options
    );
  }

  chechFavorite(userID: number, tripID: number) {
    return this.http.post<{ userID: number; tripID: number }>(
      `http://${environment.ip_adress}:${environment.port}/api/trips/trip/isfavorite`,
      {
        user: userID,
        trip: tripID,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  getWeather(city: string) {
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7ce886f7244f0f10b2adb7f8841dab38&units=metric&lang=sr`
    );
  }

  deleteTrip(trip: Trip){
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      body: {
        tripID: trip.tripID,
      },
    };
    return this.http.delete(
      `http://${environment.ip_adress}:${environment.port}/api/trips/delete-trip`,
      options
    );
  }
}
