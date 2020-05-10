import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FandfComponent } from './fandf.component';

describe('FandfComponent', () => {
  let component: FandfComponent;
  let fixture: ComponentFixture<FandfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FandfComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FandfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
