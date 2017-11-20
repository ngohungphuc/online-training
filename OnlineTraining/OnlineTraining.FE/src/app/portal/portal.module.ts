import { AccordionModule } from 'ngx-bootstrap';
import { AuthEffects } from '../account/store/effects/auth.effects';
import { BookmarkEffects } from './content/bookmarks/store/effects/bookmark.effects';
import {
  BookmarkIconComponent,
  BookmarksComponent,
  CourseDetailComponent,
  LearningPathComponent,
  LearningPathDetailComponent,
  MyCourseComponent,
  PortalHeaderComponent,
  PortalIndexComponent,
  PortalSidebarComponent
  } from './index';
import { CommonModule } from '@angular/common';
import { CourseEffects } from './content/course/store/effects/course.effects';
import { EffectsModule } from '@ngrx/effects';
import { LearningPathEffects } from './content/learning-path/store/effects/learning-path.effects';
import { NgModule } from '@angular/core';
import { portalReducer } from './store/reducers/portal.reducer';
import { portalReducers } from './store/index';
import { PortalRouting } from './portal.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PortalRouting,
    AccordionModule.forRoot(),
    StoreModule.forFeature('portalModule', portalReducers),
    EffectsModule.forFeature([LearningPathEffects, BookmarkEffects, CourseEffects])
  ],
  declarations: [
    PortalIndexComponent,
    PortalHeaderComponent,
    PortalSidebarComponent,
    LearningPathComponent,
    BookmarksComponent,
    MyCourseComponent,
    LearningPathDetailComponent,
    BookmarkIconComponent,
    CourseDetailComponent
  ],
  exports: [
  ],
  providers: [
  ]
})
export class PortalModule { }
