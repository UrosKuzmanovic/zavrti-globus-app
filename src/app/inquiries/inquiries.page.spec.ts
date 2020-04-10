import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InquiriesPage } from './inquiries.page';

describe('InquiriesPage', () => {
  let component: InquiriesPage;
  let fixture: ComponentFixture<InquiriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InquiriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
