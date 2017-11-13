import { FooterComponent } from './layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './layout/notfound/notfound.component';
import { SignalRService } from './index';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
      SignalRService
  ],
  exports: [
      FooterComponent,
      SpinnerComponent
  ],
  declarations: [
    FooterComponent,
    SpinnerComponent,
    NotFoundComponent]
})

export class SharedModule {}
