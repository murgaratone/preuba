import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WashOrdersComponent } from './wash-orders.component';

describe('WashOrdersComponent', () => {
  let component: WashOrdersComponent;
  let fixture: ComponentFixture<WashOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WashOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WashOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
