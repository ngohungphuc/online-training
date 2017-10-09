import { AccountComponent, LoginComponent, SignUpComponent } from './index';
import { RouterModule, Routes } from '@angular/router';

const accountRoutes: Routes = [
    { path: '', component: AccountComponent,
        children: [
        { path: 'signup', component: SignUpComponent },
        { path: 'login', component: LoginComponent }
    ]}
];

export const AccountRouting = RouterModule.forChild(accountRoutes);
