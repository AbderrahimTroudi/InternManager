import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternManagmentComponent } from './intern-managment.component';

describe('InternManagmentComponent', () => {
  let component: InternManagmentComponent;
  let fixture: ComponentFixture<InternManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
