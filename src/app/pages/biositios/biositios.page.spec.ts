import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BiositiosPage } from './biositios.page';

describe('BiositiosPage', () => {
  let component: BiositiosPage;
  let fixture: ComponentFixture<BiositiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiositiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BiositiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
