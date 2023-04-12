import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuprivisorLayoutComponent } from './suprivisor-layout.component';

describe('SuprivisorLayoutComponent', () => {
  let component: SuprivisorLayoutComponent;
  let fixture: ComponentFixture<SuprivisorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuprivisorLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuprivisorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
