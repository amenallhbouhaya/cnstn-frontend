import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEquipements } from './admin-equipements';

describe('AdminEquipements', () => {
  let component: AdminEquipements;
  let fixture: ComponentFixture<AdminEquipements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEquipements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEquipements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
