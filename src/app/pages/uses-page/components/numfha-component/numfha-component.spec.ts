import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumfhaComponent } from './numfha-component';

describe('NumfhaComponent', () => {
  let component: NumfhaComponent;
  let fixture: ComponentFixture<NumfhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumfhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumfhaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
