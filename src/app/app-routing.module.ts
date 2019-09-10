import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { JobsComponent } from './jobs/jobs.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { JobsEditComponent } from './jobs/jobs-edit/jobs-edit.component';


const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'jobs', component: JobsComponent, children: [
    {path: ':id', component: JobsEditComponent}
  ]},
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
