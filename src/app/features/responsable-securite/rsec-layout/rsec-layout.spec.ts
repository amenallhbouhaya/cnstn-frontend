import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsecLayout } from './rsec-layout';

describe('RsecLayout', () => {
  let component: RsecLayout;
  let fixture: ComponentFixture<RsecLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsecLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsecLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
