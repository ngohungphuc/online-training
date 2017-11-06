import * as authStore from '../store/reducers/auth.reducer';
import { AuthService } from '../../common/services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOGIN, LOGIN_FAIL } from '../store/actions/auth.actions';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ToastsManager } from 'ng2-toastr';
import { TokenModel } from '../../common/models/token.model';
import { UserState } from '../../common/core/state-management/state/user.state';


@Component({
  selector: 'ota-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: any;
  error$: Observable<string>;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<any>,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
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
  }
}
