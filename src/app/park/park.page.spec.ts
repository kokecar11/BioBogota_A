import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParkPage } from './park.page';

describe('ParkPage', () => {
  let component: ParkPage;
  let fixture: ComponentFixture<ParkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
