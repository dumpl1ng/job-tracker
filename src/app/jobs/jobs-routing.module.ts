import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { JobsEditComponent } from './jobs-edit/jobs-edit.component';
import { Authguard } from '../auth/auth-guard.service';


const routes: Routes = [
    {
        path: 'user/:userId/jobs', component: JobsComponent,
        canActivate: [Authguard],
        children: [
            { path: ':id', component: JobsEditComponent}
        ]
    },
];

const routingConfiguration: ExtraOptions = {
    paramsInheritanceStrategy: 'always'
};

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobsRoutingModule {

}