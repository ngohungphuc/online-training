import { AuthEffects } from '../account/store/effects/auth.effects';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { PortalIndexComponent } from './index';
import { portalReducer } from './store/reducers/portal.reducer';
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
    NgbModule,
    StoreModule.forFeature('portalModule', portalReducer),
    EffectsModule.forFeature([])
  ],
  declarations: [PortalIndexComponent],
  providers: [
  ]
})
export class PortalModule { }
