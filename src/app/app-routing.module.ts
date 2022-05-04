import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { ModalEventComponent } from './components/events/modal-event/modal-event.component';
import { HeaderComponent } from './components/header/header.component';
import { MyeventsComponent } from './components/events/myevents/myevents.component';

const routes: Routes = [

  { path: 'home', component: ContentComponent },
  { path: 'events/createEvent', component: CreateEventComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'modal', component: ModalEventComponent },
  { path: 'events/myevents', component: MyeventsComponent },

  // Otherwise redir home
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
