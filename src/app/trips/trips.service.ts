import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ListedTrip } from "../models/modifiedModels/listedTrips.model";
import { BehaviorSubject } from "rxjs";
import { take, filter, map, tap } from "rxjs/operators";
import { Trip } from "../models/trip.model";
import { Country } from "../models/country.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TripsService {
  private _trips = new BehaviorSubject<Trip[]>([
    // {
    //   tripID: 1,
    //   city: 'Moskva',
    //   country: 'Rusija',
    //   travelDate: new Date('2020-05-02'),
    //   returnDate: new Date('2020-05-09'),
    //   price: 350,
    //   imageSrc: '../../assets/img/trips/1.jpg'
    // },
    // {
    //   tripID: 2,
    //   city: 'Antalija',
    //   country: 'Turska',
    //   travelDate: new Date('2020-06-19'),
    //   returnDate: new Date('2020-06-29'),
    //   price: 500,
    //   imageSrc: '../../assets/img/trips/2.jpg'
    // },
    // {
    //   tripID: 3,
    //   city: 'Sevilja',
    //   country: 'Španija',
    //   travelDate: new Date('2020-05-10'),
    //   returnDate: new Date('2020-05-14'),
    //   price: 240,
    //   imageSrc: '../../assets/img/trips/3.jpg'
    // }
  ]);

  constructor(private http: HttpClient) {}

  get trips() {
    return this._trips.asObservable();
  }

  getTrip(id: number) {
    return this._trips.pipe(
      take(1),
      map((trips) => {
        return { ...trips.find((trip) => trip.tripID === id) };
      })
    );
  }

  addTrip(trip: Trip) {
    this._trips.pipe(take(1)).subscribe((trips) => {
      this._trips.next(trips.concat(trip));
    });
  }

  fetchTrips() {
    return this.http
      .get<{ [key: number]: ListedTrip }>(
        `http://${environment.ip_adress}:${environment.port}/api/trips/listedtrips`
      )
      .pipe(
        map((fetchedTrip) => {
          const trips: Trip[] = [];
          for (const key in fetchedTrip) {
            if (fetchedTrip.hasOwnProperty(key)) {
              trips.push(
                new Trip(
                  fetchedTrip[key].tripID,
                  fetchedTrip[key].city,
                  new Country(
                    fetchedTrip[key].countryID,
                    fetchedTrip[key].countryName,
                    null, // treba staviti kontinent
                    null // treba staviti zastavu
                  ),
                  fetchedTrip[key].price,
                  new Date(fetchedTrip[key].travelDate),
                  new Date(fetchedTrip[key].returnDate),
                  null, // treba staviti postDate
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
          return trips;
        }),
        tap((trips) => {
          this._trips.next(trips);
        })
      );
  }
}
