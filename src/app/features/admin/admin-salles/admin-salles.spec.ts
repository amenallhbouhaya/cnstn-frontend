import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSalles } from './admin-salles';

describe('AdminSalles', () => {
  let component: AdminSalles;
  let fixture: ComponentFixture<AdminSalles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSalles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSalles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
