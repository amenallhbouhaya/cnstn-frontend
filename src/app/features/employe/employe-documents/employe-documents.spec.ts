import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeDocuments } from './employe-documents';

describe('EmployeDocuments', () => {
  let component: EmployeDocuments;
  let fixture: ComponentFixture<EmployeDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeDocuments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
