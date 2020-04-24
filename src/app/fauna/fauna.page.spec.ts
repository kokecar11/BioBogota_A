import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaunaPage } from './fauna.page';

describe('FaunaPage', () => {
  let component: FaunaPage;
  let fixture: ComponentFixture<FaunaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaunaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaunaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
