import {
  AccountComponent,
  ForgotPasswordComponent,
  LoginComponent,
  SignUpComponent
  } from './index';
import { AccountRouting } from './account.routing';
import { AuthService } from '../common/services/auth.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AccountRouting,
    NgbModule],
  declarations: [
    AccountComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ],
  providers: [AuthService]
})
export class AccountModule {}
