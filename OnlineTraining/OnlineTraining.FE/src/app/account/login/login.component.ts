import * as authStore from '../store/index';
import { AuthService } from '../../common/services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOGIN } from '../store/actions/auth.actions';
import { Router } from '@angular/router';
import { StorageService } from '../../common/services/storage.service';
import { Store } from '@ngrx/store';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'ota-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<any>,
    private storageService: StorageService,
    private router: Router,
    private cookieService: CookieService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.isLogin();
    this.loginForm = this.fb.group({
      account: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  login(formData) {
    this.store.dispatch({
      type: LOGIN,
      payload: {
        account: formData.account.trim(),
        password: formData.password.trim()
      }
    });

    this.store.select(authStore.selectLoginState).subscribe(res => {
      if (res !== null) {
        this.toastr.warning(res);
        return;
      }
    });

    this.store.select(authStore.selectAuthStatusState).subscribe(res => {
      if (res) {
        this.cookieService.set(environment.cookieKey, 'true', 1, null, null, false);
      }
    });
  }

  isLogin() {
    const isLogin: boolean = this.cookieService.check(environment.cookieKey);
    if (isLogin) {
      this.router.navigate(['online-training/portal']);
    }
    return;
  }
}
