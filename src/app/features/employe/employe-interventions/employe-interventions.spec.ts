import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeInterventions } from './employe-interventions';

describe('EmployeInterventions', () => {
  let component: EmployeInterventions;
  let fixture: ComponentFixture<EmployeInterventions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeInterventions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeInterventions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
