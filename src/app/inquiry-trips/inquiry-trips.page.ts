import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Trip } from "../models/trip.model";
import { InquiryTripsService } from "./inquiry-trips.service";

@Component({
  selector: "app-inquiry-trips",
  templateUrl: "./inquiry-trips.page.html",
  styleUrls: ["./inquiry-trips.page.scss"],
})
export class InquiryTripsPage implements OnInit {
  inquiries: Trip[] = [];
  showList: boolean = false;
  isAdmin: boolean = false;
  defaultImg = "../../assets/img/logo/zg.jpg";

  constructor(
    private inquiryTripsService: InquiryTripsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.inquiryTripsService.getInquiries().subscribe((inquiries) => {
      this.inquiries = inquiries;
      if (this.inquiries.length > 0) this.showList = true;
      else this.showList = false;
    });
  }

  ionViewWillEnter() {
    this.authService.userIsAdmin.subscribe((isAdmin) => {
      if (!isAdmin) {
        this.isAdmin = false;
        this.authService.userID.subscribe((userID) => {
          this.inquiryTripsService
            .getInquiryTrips(userID)
            .subscribe((trips) => {
              this.inquiries = trips;
              console.log(this.inquiries);
              if (this.inquiries.length > 0) this.showList = true;
              else this.showList = false;
            });
        });
      } else {
        this.isAdmin = true;
      }
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
