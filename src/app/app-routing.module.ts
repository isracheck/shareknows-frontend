import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { HeaderComponent } from './components/header/header.component';
import { MyeventsComponent } from './components/events/myevents/myevents.component';
import { MypasswordComponent } from './components/profile/mypassword/mypassword.component';
import { MyuserComponent } from './components/profile/myuser/myuser.component';

const routes: Routes = [

  { path: 'home', component: ContentComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/myuser', component: MyuserComponent },
  { path: 'profile/mypassword', component: MypasswordComponent },
  { path: 'events/myevents', component: MyeventsComponent },
  { path: 'events/myevents/createEvent', component: CreateEventComponent },

  // Otherwise redir home
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
