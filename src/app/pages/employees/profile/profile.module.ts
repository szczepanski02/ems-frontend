import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilePasswordChangerComponent } from './profile-password-changer/profile-password-changer.component';
import { ProfileIpsDetailsComponent } from './profile-ips-details/profile-ips-details.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProfileComponent, ProfileImageComponent, ProfileIpsDetailsComponent, ProfilePasswordChangerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ProfileComponent
    }]),
    SharedModule
  ]
})
export class ProfileModule { }
