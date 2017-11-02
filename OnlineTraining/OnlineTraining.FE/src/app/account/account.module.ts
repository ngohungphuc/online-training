import {
  AccountComponent,
  ForgotPasswordComponent,
  LoginComponent,
  SignUpComponent
  } from './index';
import { AccountRouting } from './account.routing';
import { AuthEffects } from '../common/core/state-management/effects/auth.effect';
import { AuthService } from '../common/services/auth.service';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StorageService } from '../common/services/storage.service';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AccountRouting,
    NgbModule,
    EffectsModule.apply(AuthEffects)],
  declarations: [
    AccountComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ],
  providers: [
    AuthService,
    StorageService]
})
export class AccountModule {}
