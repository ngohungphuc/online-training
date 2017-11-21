import { FooterComponent } from './layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './layout/notfound/notfound.component';
import { SignalRService } from './index';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { CourseDetailBtnComponent } from './layout/course-detail-btn/course-detail-btn.component';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
      SignalRService
  ],
  exports: [
      FooterComponent,
      SpinnerComponent,
      CourseDetailBtnComponent
  ],
  declarations: [
    FooterComponent,
    SpinnerComponent,
    CourseDetailBtnComponent,
    NotFoundComponent]
})

export class SharedModule {}
