import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Country } from "../models/country.model";
import { ListedTrip } from "../models/modifiedModels/listedTrips.model";
import { Trip } from "../models/trip.model";

@Injectable({
  providedIn: "root",
})
export class InquiriesService {
  private _inquiries = new BehaviorSubject<Trip[]>([]);

  constructor(private http: HttpClient) {}

  getInquiries() {
    return this._inquiries.asObservable();
  }

  getInquiryTrips() {
    return this.http
      .get<{ [key: number]: ListedTrip }>(
        `http://${environment.ip_adress}:${environment.port}/api/trips/all-inquiry-trips`
      )
      .pipe(
        map((fetchedTrip) => {
          const inquiries: Trip[] = [];
          for (const key in fetchedTrip) {
            if (fetchedTrip.hasOwnProperty(key)) {
              inquiries.push(
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
          return inquiries;
        }),
        tap((inquiries) => {
          this._inquiries.next(inquiries);
        })
      );
  }
}
