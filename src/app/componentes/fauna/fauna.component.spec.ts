import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaunaComponent } from './fauna.component';

describe('FaunaComponent', () => {
  let component: FaunaComponent;
  let fixture: ComponentFixture<FaunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaunaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
