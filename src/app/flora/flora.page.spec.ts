import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FloraPage } from './flora.page';

describe('FloraPage', () => {
  let component: FloraPage;
  let fixture: ComponentFixture<FloraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FloraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
