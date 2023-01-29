import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicWashComponent } from './basic-wash.component';

describe('BasicWashComponent', () => {
  let component: BasicWashComponent;
  let fixture: ComponentFixture<BasicWashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicWashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicWashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
