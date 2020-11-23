import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

import * as shajs from "sha.js";
import { CodePush, InstallMode, SyncStatus } from "@ionic-native/code-push/ngx";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  isLogin: boolean = true;
  error: string = "";
  update: String = "waiting...";
  progress = "";

  private webWiew: any = window;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private codePush: CodePush
  ) {}

  ngOnInit() {
    this.checkCodePush();
    /*this.webWiew.AppCenter.Analytics.setEnabled(
      true,
      () => {},
      () => {}
    );*/
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      return;
    }

    let authObs: Observable<User[]>;
    const firstName = f.value.firstName;
    const lastName = f.value.lastName;
    const email = f.value.email;
    const oldPass = f.value.password;
    const password = shajs("sha256").update(oldPass).digest("hex");
    const dateOfBirth = f.value.dateOfBirth;

    if (this.isLogin) {
      authObs = this.authService.signin(email, password);
    } else {
      authObs = this.authService.signup(
        email,
        password,
        firstName,
        lastName,
        dateOfBirth
      );
    }

    authObs.subscribe(
      (newUser) => {
        // uspesno ulogovan/registrovan
        console.log(newUser[0]);
        /*this.webWiew.AppCenter.Analytics.trackEvent(
          "Login",
          { Role: newUser[0].role },
          () => {
            console.log("Event tracked");
          },
          (error) => {
            console.error(`error tracked: ${error}`);
          }
        );*/
        this.router.navigateByUrl("/home");
      },
      (err) => {
        // obraditi greske pri logovanju/registrovanju
        console.log(`Greska: ${err}`);
        /*this.webWiew.AppCenter.Analytics.trackEvent(
          "Login failed",
          {},
          () => {
            console.log("Event tracked");
          },
          (error) => {
            console.error(`error tracked: ${error}`);
          }
        );*/
        this.router.navigateByUrl("/home");
        this.error = err;
      }
    );
  }

  loginGuest() {
    this.router.navigateByUrl("/home");
  }

  async showPasswordHelp() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Pomoć",
      message: "Šifra mora sadržati najmanje 8 karaktera.",
      buttons: ["U redu"],
    });
    await alert.present();
  }

  checkCodePush() {
    console.log("Provera verzije");

    this.codePush
      .sync(
        {
          updateDialog: {
            appendReleaseDescription: true,
            updateTitle: "Dostupno je ažuriranje:",
            mandatoryUpdateMessage: "",
            mandatoryContinueButtonLabel: "Nastavi",
            descriptionPrefix: "\nPromene:\n\n",
          },
          installMode: InstallMode.IMMEDIATE,
        },
        (downloadProgress) => {
          this.progress = `Downloaded ${downloadProgress.receivedBytes} of ${downloadProgress.totalBytes}`;
        }
      )
      .subscribe(
        (status: SyncStatus) => {
          this.update = `CODE PUSH SUCCESSFUL: ${status}`;
          console.log("CODE PUSH SUCCESSFUL: " + status);
        },
        (err) => {
          this.update = `greska - CODE PUSH UNSUCCESSFUL: ${err}`;
          console.log("CODE PUSH SUCCESSFUL: " + err);
        }
      );
  }
}
