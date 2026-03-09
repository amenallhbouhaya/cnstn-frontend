import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsalleLayout } from './rsalle-layout';

describe('RsalleLayout', () => {
  let component: RsalleLayout;
  let fixture: ComponentFixture<RsalleLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsalleLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsalleLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
