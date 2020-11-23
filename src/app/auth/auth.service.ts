import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from "../models/user.model";
import { BehaviorSubject, from, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Plugins } from "@capacitor/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        // !!user.token
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  get userID() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.userID;
        } else {
          return null;
        }
      })
    );
  }

  get userIsAdmin() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user && user.role === "admin") {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  constructor(private http: HttpClient) {}

  autoLogin() {
    return from(Plugins.Storage.get({ key: "authData" })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          userID: number;
          email: string;
          firstName: string;
          lastName: string;
          dateOfBirth: Date;
          role: string;
        };
        const user = new User(
          parsedData.userID,
          parsedData.email,
          null,
          parsedData.firstName,
          parsedData.lastName,
          parsedData.dateOfBirth,
          parsedData.role
        );
        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ) {
    return this.http
      .post<User[]>(
        `http://${environment.ip_adress}:${environment.port}/api/users/signup`,
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  signin(email: string, password: string) {
    return this.http
      .post<User[]>(
        `http://${environment.ip_adress}:${environment.port}/api/users/signin`,
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .pipe(tap(this.setUserData.bind(this)), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }

  logout() {
    this._user.next(null);
    Plugins.Storage.remove({ key: "authData" });
  }

  private setUserData(userData: User[]) {
    this._user.next(
      new User(
        userData[0].userid,
        userData[0].email,
        userData[0].password,
        userData[0].firstname,
        userData[0].lastname,
        userData[0].dateofbirth,
        userData[0].role
      )
    );
    this.storeAuthData(
      userData[0].userid,
      userData[0].email,
      userData[0].firstname,
      userData[0].lastname,
      userData[0].dateofbirth,
      userData[0].role
    );
  }

  private storeAuthData(
    userID: number,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    role: string
  ) {
    const data = JSON.stringify({
      userID: userID,
      email: email,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      role: role,
    });
    Plugins.Storage.set({ key: "authData", value: data });
  }
}
