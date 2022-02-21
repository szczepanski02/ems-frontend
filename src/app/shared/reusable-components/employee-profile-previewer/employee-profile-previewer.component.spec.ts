import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfilePreviewerComponent } from './employee-profile-previewer.component';

describe('EmployeeProfilePreviewerComponent', () => {
  let component: EmployeeProfilePreviewerComponent;
  let fixture: ComponentFixture<EmployeeProfilePreviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProfilePreviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfilePreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
