import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeHome } from './employe-home';

describe('EmployeHome', () => {
  let component: EmployeHome;
  let fixture: ComponentFixture<EmployeHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
