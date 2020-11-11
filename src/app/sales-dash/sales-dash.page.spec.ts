import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalesDashPage } from './sales-dash.page';

describe('SalesDashPage', () => {
  let component: SalesDashPage;
  let fixture: ComponentFixture<SalesDashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesDashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
