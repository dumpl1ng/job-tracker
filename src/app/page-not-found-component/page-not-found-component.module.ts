import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponentComponent } from './page-not-found-component.component';
import { PageNotFoundComponentComponentRoutingModule } from './page-not-found-component-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PageNotFoundComponentComponent],
  imports: [
    CommonModule,
    RouterModule,
    PageNotFoundComponentComponentRoutingModule
  ],
  exports: [PageNotFoundComponentComponent]
})
export class PageNotFoundComponentModule { }
