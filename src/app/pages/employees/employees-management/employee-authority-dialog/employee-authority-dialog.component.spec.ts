import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAuthorityDialogComponent } from './employee-authority-dialog.component';

describe('EmployeeAuthorityDialogComponent', () => {
  let component: EmployeeAuthorityDialogComponent;
  let fixture: ComponentFixture<EmployeeAuthorityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAuthorityDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAuthorityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
