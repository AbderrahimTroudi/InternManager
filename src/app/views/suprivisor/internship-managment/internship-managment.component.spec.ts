import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipManagmentComponent } from './internship-managment.component';

describe('InternshipManagmentComponent', () => {
  let component: InternshipManagmentComponent;
  let fixture: ComponentFixture<InternshipManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshipManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternshipManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
