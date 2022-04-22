import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [

  { path: 'content', component: ContentComponent },
  { path: 'signup', component: SignupComponent },

  // Otherwise redir home
  { path: '', redirectTo: 'content', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
