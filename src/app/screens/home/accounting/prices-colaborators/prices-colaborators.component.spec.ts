import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesColaboratorsComponent } from './prices-colaborators.component';

describe('PricesColaboratorsComponent', () => {
  let component: PricesColaboratorsComponent;
  let fixture: ComponentFixture<PricesColaboratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricesColaboratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricesColaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
