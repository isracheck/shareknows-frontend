import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { CardEventComponent } from './components/events/card-event/card-event.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { MyeventsComponent } from './components/events/myevents/myevents.component';
import { DatePipe } from '@angular/common';
import { MyuserComponent } from './components/profile/myuser/myuser.component';
import { MypasswordComponent } from './components/profile/mypassword/mypassword.component';
import { AlleventsComponent } from './components/events/allevents/allevents.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    SignupComponent,
    LoginComponent,
    CreateEventComponent,
    CardEventComponent,
    MyeventsComponent,
    MyuserComponent,
    MypasswordComponent,
    AlleventsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
