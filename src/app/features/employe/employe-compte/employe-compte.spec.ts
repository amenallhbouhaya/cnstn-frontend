import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeCompte } from './employe-compte';

describe('EmployeCompte', () => {
  let component: EmployeCompte;
  let fixture: ComponentFixture<EmployeCompte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeCompte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeCompte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
