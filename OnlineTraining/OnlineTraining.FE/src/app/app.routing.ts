import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/index';
import { NotFoundComponent } from './shared/layout/notfound/notfound.component';


export const appRoutes: Routes = [
    { path: '', redirectTo: 'account/login', pathMatch: 'full' },
    { path: 'account', loadChildren: './account/account.module#AccountModule' },
    { path: '**', redirectTo: '/notfound', pathMatch: 'full' },
    { path: 'notfound', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule { }