import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceHolderDirective } from './place-holder.directive';



@NgModule({
  declarations: [
    ErrorComponent,
    LoadingSpinnerComponent,
    PlaceHolderDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorComponent,
    LoadingSpinnerComponent,
    PlaceHolderDirective
  ]
})
export class SharedModule { }
