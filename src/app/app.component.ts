import { Component, OnDestroy, OnInit, Output } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  public logged: boolean;
  public admin: boolean;
  private previousAuthState = false;

  loggedSub: Subscription;
  adminSub: Subscription;
  authSub: Subscription;

  private webWiew: any = window;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.loggedSub = this.authService.userIsAuthenticated.subscribe(
      (logged) => {
        console.log(`Logovan je ${logged}`);
        this.logged = logged;
      }
    );
    this.adminSub = this.authService.userIsAdmin.subscribe((admin) => {
      console.log(`Admin je ${admin}`);
      this.admin = admin;
    });
    
  }

  ngOnInit() {
    this.authSub = this.authService.userIsAuthenticated.subscribe((isAuth) => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl("/auth");
      }
      this.previousAuthState = isAuth;
    });
  }

  ngOnDestroy() {
    if (this.loggedSub) {
      this.loggedSub.unsubscribe();
    }
    if (this.adminSub) {
      this.adminSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    //this.router.navigateByUrl("/auth");
  }

  socialNetworkClick(app: string) {
    /*this.webWiew.AppCenter.Analytics.trackEvent(
      "Social network opened",
      { app: app },
      () => {
        console.log("Event tracked");
      },
      (error) => {
        console.error(`error tracked: ${error}`);
      }
    );*/
  }
}
