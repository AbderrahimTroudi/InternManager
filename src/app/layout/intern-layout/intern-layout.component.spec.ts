import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternLayoutComponent } from './intern-layout.component';

describe('InternLayoutComponent', () => {
  let component: InternLayoutComponent;
  let fixture: ComponentFixture<InternLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
