import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CodePush, InstallMode, SyncStatus } from "@ionic-native/code-push/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  private exitSub: Subscription;
  update: String = "waiting...";
  progress = "";

  private webWiew: any = window;

  constructor(private codePush: CodePush) {}

  ngOnInit() {
    this.checkCodePush();
    this.webWiew.AppCenter.Analytics.setEnabled(
      true,
      () => {},
      () => {}
    );
    this.webWiew.AppCenter.Analytics.trackEvent(
      "App start",
      {},
      () => {
        console.log("Event tracked");
      },
      (error) => {
        console.error(`error tracked: ${error}`);
      }
    );
  }

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
