import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeMesEvenements } from './employe-mes-evenements';

describe('EmployeMesEvenements', () => {
  let component: EmployeMesEvenements;
  let fixture: ComponentFixture<EmployeMesEvenements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeMesEvenements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeMesEvenements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
