import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NotifyleaveComponent } from './notifyleave/notifyleave.component';
import { FormSubmittedComponent } from './form-submitted/form-submitted.component';
import { PendingComponent } from './pages/pending/pending.component';



const routes: Routes = [
  {path:"homepage",component:HomepageComponent},
  {path:"notifyleave",component:NotifyleaveComponent},
  {path:"success",component:FormSubmittedComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'pending', component: PendingComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
