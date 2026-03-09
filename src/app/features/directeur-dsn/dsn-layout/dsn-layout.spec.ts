import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsnLayout } from './dsn-layout';

describe('DsnLayout', () => {
  let component: DsnLayout;
  let fixture: ComponentFixture<DsnLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsnLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsnLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
