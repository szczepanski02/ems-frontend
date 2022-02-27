import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesIpsRequestsComponent } from './employees-ips-requests.component';

describe('EmployeesIpsRequestsComponent', () => {
  let component: EmployeesIpsRequestsComponent;
  let fixture: ComponentFixture<EmployeesIpsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesIpsRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesIpsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
