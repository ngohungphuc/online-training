import { AuthEffects } from '../account/store/effects/auth.effects';
import { BookmarkEffects } from './content/bookmarks/store/effects/bookmark.effects';
import {
  BookmarkIconComponent,
  BookmarksComponent,
  LearningPathComponent,
  LearningPathDetailComponent,
  MyCourseComponent,
  PortalHeaderComponent,
  PortalIndexComponent,
  PortalSidebarComponent,
  CourseDetailComponent
  } from './index';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { LearningPathEffects } from './content/learning-path/store/effects/learning-path.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { portalReducer } from './store/reducers/portal.reducer';
import { portalReducers } from './store/index';
import { PortalRouting } from './portal.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { AccordionModule } from 'ngx-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PortalRouting,
    NgbModule,
    AccordionModule.forRoot(),
    StoreModule.forFeature('portalModule', portalReducers),
    EffectsModule.forFeature([LearningPathEffects, BookmarkEffects])
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
