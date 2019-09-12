import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { PageNotFoundComponentComponent } from './page-not-found-component.component';


@NgModule({
    imports: [
        RouterModule.forChild([
          { path: '**', component: PageNotFoundComponentComponent }
        ])
      ],
      exports: [RouterModule]
})
export class PageNotFoundComponentComponentRoutingModule {}