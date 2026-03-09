import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsalleEvenementsPending } from './rsalle-evenements-pending';

describe('RsalleEvenementsPending', () => {
  let component: RsalleEvenementsPending;
  let fixture: ComponentFixture<RsalleEvenementsPending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsalleEvenementsPending]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsalleEvenementsPending);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
