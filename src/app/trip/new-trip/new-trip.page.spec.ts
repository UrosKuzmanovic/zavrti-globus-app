import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewTripPage } from './new-trip.page';

describe('NewTripPage', () => {
  let component: NewTripPage;
  let fixture: ComponentFixture<NewTripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTripPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
