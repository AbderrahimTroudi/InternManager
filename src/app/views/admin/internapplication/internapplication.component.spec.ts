import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternapplicationComponent } from './internapplication.component';

describe('InternapplicationComponent', () => {
  let component: InternapplicationComponent;
  let fixture: ComponentFixture<InternapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternapplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
