import { CommonModule } from '@angular/common';
import { CourseDetailBtnComponent } from './layout/course-detail-btn/course-detail-btn.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderService } from './loader/loader.service';
import { NgModule } from '@angular/core';
import { NgProgressModule } from 'ngx-progressbar';
import { NotFoundComponent } from './layout/notfound/notfound.component';
import { SignalRService } from './index';
import { SpinnerComponent } from './loader/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    NgProgressModule
  ],
  providers: [
      SignalRService,
      LoaderService
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
    NotFoundComponent
  ]
})

export class SharedModule {}
