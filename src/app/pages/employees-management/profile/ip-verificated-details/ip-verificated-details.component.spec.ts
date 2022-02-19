import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpVerificatedDetailsComponent } from './ip-verificated-details.component';

describe('IpVerificatedDetailsComponent', () => {
  let component: IpVerificatedDetailsComponent;
  let fixture: ComponentFixture<IpVerificatedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpVerificatedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpVerificatedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
