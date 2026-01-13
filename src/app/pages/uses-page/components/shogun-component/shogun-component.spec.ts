import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShogunComponent } from './shogun-component';

describe('ShogunComponent', () => {
  let component: ShogunComponent;
  let fixture: ComponentFixture<ShogunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShogunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShogunComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
