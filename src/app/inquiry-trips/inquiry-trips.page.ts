import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Trip } from "../models/trip.model";
import { OtherServicesService } from "../services/other-services.service";
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
    private authService: AuthService,
    private otherServices: OtherServicesService
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
}
