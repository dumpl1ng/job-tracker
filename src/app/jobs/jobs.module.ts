import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobsItemComponent } from './jobs-list/jobs-item/jobs-item.component';
import { JobsEditComponent } from './jobs-edit/jobs-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobsRoutingModule } from './jobs-routing.module';



@NgModule({
  declarations: [
    JobsComponent,
    JobsListComponent,
    JobsItemComponent,
    JobsEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    JobsRoutingModule
  ],
  exports: [
    JobsComponent,
    JobsListComponent,
    JobsItemComponent,
    JobsEditComponent
  ]
})
export class JobsModule { }
