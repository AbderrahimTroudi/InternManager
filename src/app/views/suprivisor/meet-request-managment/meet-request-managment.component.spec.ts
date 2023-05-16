import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetRequestManagmentComponent } from './meet-request-managment.component';

describe('MeetRequestManagmentComponent', () => {
  let component: MeetRequestManagmentComponent;
  let fixture: ComponentFixture<MeetRequestManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetRequestManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetRequestManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
