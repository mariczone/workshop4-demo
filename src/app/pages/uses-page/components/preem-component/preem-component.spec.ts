import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreemComponent } from './preem-component';

describe('PreemComponent', () => {
  let component: PreemComponent;
  let fixture: ComponentFixture<PreemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
