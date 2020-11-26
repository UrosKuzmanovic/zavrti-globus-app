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

  showConfirmationAlert(question: string, test: any) {
    this.alertCtrl.create({
      message: question,
      buttons: [
        {
          text: "Ne",
          role: "cancel",
        },
        {
          text: "Da",
          handler: () => {
            
          },
        },
      ],
    });
  }

  dateFormat(dateFrom: Date, dateTo: Date) {
    var dayFrom = dateFrom.getUTCDate();
    var monthFrom = dateFrom.getUTCMonth() + 1;
    var yearFrom = dateFrom.getUTCFullYear();

    var dayTo = dateTo.getUTCDate();
    var monthTo = dateTo.getUTCMonth() + 1;
    var yearTo = dateTo.getUTCFullYear();

    if (yearFrom === yearTo) {
      if (monthFrom === monthTo) {
        if (dayFrom === dayTo) {
          return `${dayFrom}. ${this.monthFormat(monthFrom)} ${yearFrom}.`;
        } else {
          return `${dayFrom}-${dayTo}. ${this.monthFormat(
            monthFrom
          )} ${yearFrom}.`;
        }
      } else {
        return `${dayFrom}. ${this.monthFormat(
          monthFrom
        )} - ${dayTo}. ${this.monthFormat(monthTo)} ${yearFrom}.`;
      }
    } else {
      return `${dayFrom}. ${this.monthFormat(
        monthFrom
      )} ${yearFrom} - ${dayTo}. ${this.monthFormat(monthTo)} ${yearTo}.`;
    }
  }

  oneDateFormat(postFrom: Date) {
    var dayFrom = postFrom.getUTCDate();
    var monthFrom = postFrom.getUTCMonth() + 1;
    var yearFrom = postFrom.getUTCFullYear();

    return `${dayFrom}. ${this.monthFormat(monthFrom)} ${yearFrom}.`;
  }

  monthFormat(month: number) {
    switch (month) {
      case 1:
        return "jan";
      case 2:
        return "feb";
      case 3:
        return "mar";
      case 4:
        return "apr";
      case 5:
        return "maj";
      case 6:
        return "jun";
      case 7:
        return "jul";
      case 8:
        return "avg";
      case 9:
        return "sep";
      case 10:
        return "okt";
      case 11:
        return "nov";
      case 12:
        return "dec";
      default:
        return "null";
    }
  }
}
