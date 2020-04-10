import { Component } from '@angular/core';
import { splitAtColon } from '@angular/compiler/src/util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  slideOptionsHeadline = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: {
      delay: 3000
    },
    speed: 500
  }

  flags = ["brazil", "china", "egypt", "france", "germany", "greece", "italy", "japan", "portugal", "russia", "spain", "usa"]

  getFlagName(flag: string){
    return `../../assets/img/flags/${flag}.jpg`;
  }

  slideOptionsFlags = {
    initialSlide: 0,
    slidesPerView: 5,
    freeMode: true,
    freeModeMomentum: false
  }

}
