import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

  favorite = false;
  desc = 'Aranžman ne uključuje:\n•Transfer aerodrom-hotel-aerodrom.\n---------------------------------------------\nCena aranžmana formirana je na dan objavljivanja ponude.\n\nZa sve nedoumice, pitanja i prijave javite nam se privatnom porukom ili na mail zavrtiglobus@gmail.com'

  constructor() { }

  ngOnInit() {
  }

  toggleFavorite(){
    this.favorite = !this.favorite;
  }

}
