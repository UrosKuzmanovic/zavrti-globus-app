import { Component, OnInit } from "@angular/core";
import { splitAtColon } from "@angular/compiler/src/util";
import { Subscription } from "rxjs";
import { Platform } from "@ionic/angular";
import { CodePush, InstallMode, SyncStatus } from "@ionic-native/code-push/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  //private platform: Platform;
  private exitSub: Subscription;
  update: String = "waiting...";

  constructor(private codePush: CodePush) {}

  ngOnInit() {
    /*this.platform.ready().then(() => {
      this.checkCodePush();
    });*/

    this.checkCodePush();
  }

  progress = "";

  slideOptionsHeadline = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
    speed: 500,
  };

  flags = [
    "brazil",
    "china",
    "egypt",
    "france",
    "germany",
    "greece",
    "italy",
    "japan",
    "portugal",
    "russia",
    "spain",
    "usa",
  ];

  getFlagName(flag: string) {
    return `../../assets/img/flags/${flag}.jpg`;
  }

  slideOptionsFlags = {
    initialSlide: 0,
    slidesPerView: 5,
    freeMode: true,
    freeModeMomentum: false,
  };

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
