import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class OtherServicesService {
  constructor(private alertCtrl: AlertController) {}

  showAlert(header: string, message: string) {
    this.alertCtrl
      .create({
        header: header,
        message: message,
        buttons: [
          {
            text: "OK",
            role: "cancel",
          },
        ],
      })
      .then((alertEl) => {
        return alertEl.present();
      });
  }
}
