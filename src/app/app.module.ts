import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { AnimationComponent } from './auth/animation/animation.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ErrorComponent } from './shared/error/error.component';
import { PlaceHolderDirective } from './shared/place-holder.directive';
import { JobsModule } from './jobs/jobs.module';
import { PageNotFoundComponentModule } from './page-not-found-component/page-not-found-component.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    AnimationComponent,
    LoadingSpinnerComponent,
    ErrorComponent,
    PlaceHolderDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JobsModule,
    PageNotFoundComponentModule
  ],
  entryComponents: [ErrorComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
