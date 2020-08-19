import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ListedTrip } from "../models/modifiedModels/listedTrips.model";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Trip } from "../models/trip.model";
import { Country } from "../models/country.model";

@Injectable({
  providedIn: "root",
})
export class FavoriteTripsService {
  private _favorites = new BehaviorSubject<Trip[]>([]);

  constructor(private http: HttpClient) {}

  get favorites() {
    return this._favorites.asObservable();
  }

  clearFavorites() {
    console.log("ocistio");
    this._favorites.next([]);
  }

  getFavorites(userID: number) {
    console.log("getting favs");
    return this.http
      .post<{ [key: number]: ListedTrip }>(
        "http://localhost:5000/api/trips/favoritetrips",
        {
          user: userID,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .pipe(
        map((fetchedTrip) => {
          const favs: Trip[] = [];
          for (const key in fetchedTrip) {
            if (fetchedTrip.hasOwnProperty(key)) {
              favs.push(
                new Trip(
                  fetchedTrip[key].tripID,
                  fetchedTrip[key].city,
                  new Country(
                    fetchedTrip[key].countryID,
                    fetchedTrip[key].countryName,
                    null,                                                             // treba staviti kontinent
                    null                                                              // treba staviti zastavu
                  ),
                  fetchedTrip[key].price,
                  new Date(fetchedTrip[key].travelDate),
                  new Date(fetchedTrip[key].returnDate),
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  fetchedTrip[key].imageSrc,
                  null
                )
              );
            }
          }
          return favs;
        }),
        tap((favs) => {
          this._favorites.next(favs);
        })
      );
  }
}
