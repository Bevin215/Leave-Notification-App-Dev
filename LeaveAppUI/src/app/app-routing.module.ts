import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NotifyleaveComponent } from './notifyleave/notifyleave.component';

const routes: Routes = [
  {path:"homepage",component:HomepageComponent},
  {path:"notifyleave",component:NotifyleaveComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
