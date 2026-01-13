import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MekComponent } from './mek-component';

describe('MekComponent', () => {
  let component: MekComponent;
  let fixture: ComponentFixture<MekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MekComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
