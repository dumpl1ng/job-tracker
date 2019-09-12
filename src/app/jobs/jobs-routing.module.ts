import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { JobsEditComponent } from './jobs-edit/jobs-edit.component';

const routes: Routes = [
    {
        path: 'jobs', component: JobsComponent, children: [
            { path: ':id', component: JobsEditComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobsRoutingModule {

}