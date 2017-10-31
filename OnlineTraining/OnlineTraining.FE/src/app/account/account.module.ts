import {
  AccountComponent,
  ForgotPasswordComponent,
  LoginComponent,
  SignUpComponent
  } from './index';
import { AccountRouting } from './account.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AccountRouting
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ]
})
export class AccountModule { }
