import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MingComponent } from './ming-component';

describe('MingComponent', () => {
  let component: MingComponent;
  let fixture: ComponentFixture<MingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
