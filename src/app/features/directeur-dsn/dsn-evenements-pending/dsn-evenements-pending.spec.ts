import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsnEvenementsPending } from './dsn-evenements-pending';

describe('DsnEvenementsPending', () => {
  let component: DsnEvenementsPending;
  let fixture: ComponentFixture<DsnEvenementsPending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsnEvenementsPending]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsnEvenementsPending);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
