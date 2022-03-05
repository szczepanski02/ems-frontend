import { HttpCredentialsInterceptor } from './inceptors/HttpCredentialsInterceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './inceptors/HttpInterceptorService';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { SharedModule } from './shared/shared.module';
import { NavToolbarComponent } from './layout/nav-toolbar/nav-toolbar.component';
import { NavDrawerModule } from './layout/nav-drawer/nav-drawer.module';
import { UserDropdownListComponent } from './layout/nav-toolbar/user-dropdown-list/user-dropdown-list.component';
import { HttpErrorInterceptor } from './inceptors/HttpErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoadingScreenComponent,
    NavToolbarComponent,
    UserDropdownListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    NavDrawerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCredentialsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
