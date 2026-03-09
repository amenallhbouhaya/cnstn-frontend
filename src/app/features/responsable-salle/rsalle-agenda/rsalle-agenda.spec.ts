import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsalleAgenda } from './rsalle-agenda';

describe('RsalleAgenda', () => {
  let component: RsalleAgenda;
  let fixture: ComponentFixture<RsalleAgenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsalleAgenda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsalleAgenda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
