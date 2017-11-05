import {SharedModule} from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PortalRouting } from './portal.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PortalIndexComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PortalRouting,
    NgbModule,
    // StoreModule.forFeature('portal'),
    EffectsModule.forFeature([])
  ],
  declarations: [PortalIndexComponent]
})
export class PortalModule { }
