import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIpsDetailsComponent } from './profile-ips-details.component';

describe('ProfileIpsDetailsComponent', () => {
  let component: ProfileIpsDetailsComponent;
  let fixture: ComponentFixture<ProfileIpsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileIpsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileIpsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
