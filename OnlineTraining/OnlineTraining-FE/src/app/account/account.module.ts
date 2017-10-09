import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRouting } from './account.routing';

import {
  AccountComponent,
  LoginComponent,
  SignUpComponent } from './index';


@NgModule({
  imports: [
    CommonModule,
    AccountRouting
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    SignUpComponent
  ]
})
export class AccountModule { }
