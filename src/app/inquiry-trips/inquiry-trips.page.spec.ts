import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InquiryTripsPage } from './inquiry-trips.page';

describe('InquiryTripsPage', () => {
  let component: InquiryTripsPage;
  let fixture: ComponentFixture<InquiryTripsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryTripsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InquiryTripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
