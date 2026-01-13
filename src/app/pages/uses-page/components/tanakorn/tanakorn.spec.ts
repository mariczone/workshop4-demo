import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tanakorn } from './tanakorn';

describe('Tanakorn', () => {
  let component: Tanakorn;
  let fixture: ComponentFixture<Tanakorn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tanakorn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tanakorn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
