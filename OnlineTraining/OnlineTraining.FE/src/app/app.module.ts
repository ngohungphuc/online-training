import { AccountModule } from './account/account.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './account/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CustomRouterStateSerializer } from './shared/utils';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { metaReducers, reducers } from './common/core/state-management/reducers/index';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { SharedModule } from './shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOption } from './shared/helper/toast.options';
import { ToastOptions } from 'ng2-toastr';
import { PortalModule } from './portal/portal.module';
import { CookieModule } from 'ngx-cookie';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    FormsModule,
    HttpModule,
    SharedModule,
    AppRoutingModule,
    CookieModule.forRoot(),
      /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),
    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule,
    /**
      * Store devtools instrument the store retaining past versions of state
      * and recalculating new states. This enables powerful time-travel
      * debugging.
      *
      * To use the debugger, install the Redux Devtools extension for either
      * Chrome or Firefox
      *
      * See: https://github.com/zalmoxisus/redux-devtools-extension
    */
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    AccountModule,
    PortalModule
  ],
  providers: [
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    {provide: ToastOptions, useClass: ToastOption},
    AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
