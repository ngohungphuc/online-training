import { FooterComponent } from './layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './layout/notfound/notfound.component';
import { SignalRService } from './index';

@NgModule({
  providers: [
      SignalRService
  ],
  exports: [
      FooterComponent
  ],
  declarations: [
    FooterComponent,
    NotFoundComponent]
})

export class SharedModule {}
