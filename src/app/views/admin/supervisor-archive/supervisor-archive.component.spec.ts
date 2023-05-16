import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorArchiveComponent } from './supervisor-archive.component';

describe('SupervisorArchiveComponent', () => {
  let component: SupervisorArchiveComponent;
  let fixture: ComponentFixture<SupervisorArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
