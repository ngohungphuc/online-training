import { AuthEffects } from '../account/store/effects/auth.effects';
import {
  BookmarksComponent,
  LearningPathComponent,
  MyCourseComponent,
  PortalHeaderComponent,
  PortalIndexComponent,
  PortalSidebarComponent
  } from './index';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { LearningPathEffects } from './content/learning-path/store/effects/learning-path.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { portalReducer } from './store/reducers/portal.reducer';

import { PortalRouting } from './portal.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { portalReducers } from './store/index';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PortalRouting,
    NgbModule,
    StoreModule.forFeature('portalModule', portalReducers),
    EffectsModule.forFeature([LearningPathEffects])
  ],
  declarations: [
    PortalIndexComponent,
    PortalHeaderComponent,
    PortalSidebarComponent,
    LearningPathComponent,
    BookmarksComponent,
    MyCourseComponent
  ],
  exports: [
  ],
  providers: [
  ]
})
export class PortalModule { }
