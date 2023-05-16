import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternArchiveComponent } from './intern-archive.component';

describe('InternArchiveComponent', () => {
  let component: InternArchiveComponent;
  let fixture: ComponentFixture<InternArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
