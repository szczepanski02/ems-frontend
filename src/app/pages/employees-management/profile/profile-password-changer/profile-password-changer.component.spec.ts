import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePasswordChangerComponent } from './profile-password-changer.component';

describe('ProfilePasswordChangerComponent', () => {
  let component: ProfilePasswordChangerComponent;
  let fixture: ComponentFixture<ProfilePasswordChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePasswordChangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePasswordChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
