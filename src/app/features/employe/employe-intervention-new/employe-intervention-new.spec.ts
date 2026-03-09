import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeInterventionNew } from './employe-intervention-new';

describe('EmployeInterventionNew', () => {
  let component: EmployeInterventionNew;
  let fixture: ComponentFixture<EmployeInterventionNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeInterventionNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeInterventionNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
