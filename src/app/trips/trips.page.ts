import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {

  showSearchBar = false;
  showFilter = false;
  selectedCountry = 'all';

  constructor() { }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.showSearchBar = false;
    this.showFilter = false;
  }

  toggleSearchBar(){
    this.showSearchBar = !this.showSearchBar;
    this.showFilter = false;
  }

  toggleFilter(){
    this.showFilter = !this.showFilter;
    this.showSearchBar = false;
  }

}
