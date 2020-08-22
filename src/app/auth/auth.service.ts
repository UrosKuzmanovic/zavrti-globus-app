import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";

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

  signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ) {
    return this.http
      .post<User[]>(
        "http://localhost:5000/api/users/signup",
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth
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
        "http://localhost:5000/api/users/signin",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    this._user.next(null);
  }

  private setUserData(userData: User[]) {
    this._user.next(
      new User(
        userData[0].userID,
        userData[0].email,
        userData[0].password,
        userData[0].firstName,
        userData[0].lastName,
        userData[0].dateOfBirth,
        userData[0].role
      )
    );
  }
}
