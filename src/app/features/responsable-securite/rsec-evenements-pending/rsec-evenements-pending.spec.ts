import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsecEvenementsPending } from './rsec-evenements-pending';

describe('RsecEvenementsPending', () => {
  let component: RsecEvenementsPending;
  let fixture: ComponentFixture<RsecEvenementsPending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsecEvenementsPending]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsecEvenementsPending);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
