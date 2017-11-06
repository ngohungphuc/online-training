import {
  AccountComponent,
  ForgotPasswordComponent,
  LoginComponent,
  SignUpComponent
  } from './index';
import { AccountRouting } from './account.routing';
import { AuthEffects } from './store/effects/auth.effects';
import { authReducer } from './store/reducers/auth.reducer';
import { AuthService } from '../common/services/auth.service';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { LoginService } from './store/services/login.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StorageService } from '../common/services/storage.service';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './auth.guard';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AccountRouting,
    NgbModule,
    StoreModule.forFeature('authModule', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ],
  providers: [
    AuthService,
    StorageService,
    LoginService
  ]
})
export class AccountModule {}
