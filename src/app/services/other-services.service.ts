import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Country } from "../models/country.model";

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
          handler: () => {},
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

  returnFlag(country: Country) {
    return `https://www.countryflags.io/${country.flagSrc}/flat/24.png`;
  }

  convertLatinicWords(word: string) {
    var letters = word.toLocaleLowerCase().split("");
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] === "č") {
        letters[i] = "c";
      } else if (letters[i] === "ć") {
        letters[i] = "c";
      } else if (letters[i] === "š") {
        letters[i] = "s";
      } else if (letters[i] === "đ") {
        letters[i] = "dj";
      } else if (letters[i] === "ž") {
        letters[i] = "z";
      }
    }
    return letters.join("");
  }
}
