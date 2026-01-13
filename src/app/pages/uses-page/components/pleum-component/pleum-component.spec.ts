import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleumComponent } from './pleum-component';

describe('PleumComponent', () => {
  let component: PleumComponent;
  let fixture: ComponentFixture<PleumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PleumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PleumComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
