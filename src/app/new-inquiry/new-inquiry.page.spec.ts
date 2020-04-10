import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewInquiryPage } from './new-inquiry.page';

describe('NewInquiryPage', () => {
  let component: NewInquiryPage;
  let fixture: ComponentFixture<NewInquiryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInquiryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewInquiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
