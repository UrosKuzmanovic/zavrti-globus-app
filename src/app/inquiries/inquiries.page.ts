import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Trip } from "../models/trip.model";
import { OtherServicesService } from "../services/other-services.service";
import { InquiriesService } from "./inquiries.service";

@Component({
  selector: "app-inquiries",
  templateUrl: "./inquiries.page.html",
  styleUrls: ["./inquiries.page.scss"],
})
export class InquiriesPage implements OnInit {
  inquiries: Trip[] = [];
  showList: boolean = false;
  isAdmin: boolean = false;
  defaultImg = "../../assets/img/logo/zg.jpg";

  constructor(
    private inquiriesServise: InquiriesService,
    private otherServices: OtherServicesService
  ) {}

  ngOnInit() {
    this.inquiriesServise.getInquiries().subscribe((inquiries) => {
      this.inquiries = inquiries;
      if (this.inquiries.length > 0) this.showList = true;
      else this.showList = false;
    });
  }

  ionViewWillEnter() {
    this.inquiriesServise.getInquiryTrips().subscribe((trips) => {
      this.inquiries = trips;
      console.log(this.inquiries);
      if (this.inquiries.length > 0) this.showList = true;
      else this.showList = false;
    });
  }
}
