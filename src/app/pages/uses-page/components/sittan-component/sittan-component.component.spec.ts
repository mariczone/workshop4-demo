import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SittanComponentComponent } from './sittan-component.component';

describe('SittanComponentComponent', () => {
  let component: SittanComponentComponent;
  let fixture: ComponentFixture<SittanComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SittanComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SittanComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
