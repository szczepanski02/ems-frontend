import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreatorDialogComponent } from './employee-creator-dialog.component';

describe('EmployeeCreatorDialogComponent', () => {
  let component: EmployeeCreatorDialogComponent;
  let fixture: ComponentFixture<EmployeeCreatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCreatorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
