import {
    AccountComponent,
    ForgotPasswordComponent,
    LoginComponent,
    SignUpComponent
    } from './index';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'signup', component: SignUpComponent},
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  }
];

export const AccountRouting = RouterModule.forChild(accountRoutes);
