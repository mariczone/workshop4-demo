import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchComponent } from './march-component';

describe('MarchComponent', () => {
  let component: MarchComponent;
  let fixture: ComponentFixture<MarchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
