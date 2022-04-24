import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';

const routes: Routes = [

  { path: 'content', component: ContentComponent },
  { path: 'events/createEvent', component: CreateEventComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },

  // Otherwise redir home
  { path: '', redirectTo: 'content', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
