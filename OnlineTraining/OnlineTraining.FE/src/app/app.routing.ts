import { AuthGuard } from './account/auth.guard';
import { LoginComponent } from './account/index';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './shared/layout/notfound/notfound.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


export const appRoutes: Routes = [
    { path: '', redirectTo: 'account/login', pathMatch: 'full' },
    { path: 'online-training/portal', loadChildren: './portal/portal.module#PortalModule' , canActivate: [AuthGuard] },
    { path: 'account', loadChildren: './account/account.module#AccountModule' },
    { path: '**', redirectTo: '/notfound', pathMatch: 'full' },
    { path: 'notfound', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
