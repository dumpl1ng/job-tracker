import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { AnimationComponent } from './auth/animation/animation.component';
import { FormsModule }  from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JobsComponent } from './jobs/jobs.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ErrorComponent } from './shared/error/error.component';
import { PlaceHolderDirective } from './shared/place-holder.directive';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { JobsItemComponent } from './jobs/jobs-list/jobs-item/jobs-item.component';
import { JobsEditComponent } from './jobs/jobs-edit/jobs-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    AnimationComponent,
    JobsComponent,
    PageNotFoundComponentComponent,
    LoadingSpinnerComponent,
    ErrorComponent,
    PlaceHolderDirective,
    JobsListComponent,
    JobsItemComponent,
    JobsEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [ErrorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
