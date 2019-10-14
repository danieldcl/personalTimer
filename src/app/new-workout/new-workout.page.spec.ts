import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkoutPage } from './new-workout.page';

describe('NewWorkoutPage', () => {
  let component: NewWorkoutPage;
  let fixture: ComponentFixture<NewWorkoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWorkoutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWorkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
