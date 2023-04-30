import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuprivisorProfileComponent } from './suprivisor-profile.component';

describe('SuprivisorProfileComponent', () => {
  let component: SuprivisorProfileComponent;
  let fixture: ComponentFixture<SuprivisorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuprivisorProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuprivisorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
