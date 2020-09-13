import { Component, Output } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  public logged: boolean;
  public admin: boolean;

  loggedSub: Subscription;
  adminSub: Subscription;

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
    this.loggedSub = this.authService.userIsAuthenticated.subscribe(logged => {
      console.log(`Logovan je ${logged}`);
      this.logged = logged;
    })
    this.adminSub = this.authService.userIsAdmin.subscribe(admin => {
      console.log(`Admin je ${admin}`);
      this.admin = admin;
    })
  }

  ngOnDestroy(): void {
    this.loggedSub.unsubscribe();
    this.adminSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/auth");
  }
}
