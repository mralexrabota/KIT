import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { LoginMutation } from './api/mutation';
import { AuthStoreService } from 'src/app/services/auth-store.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public profileForm = this._formBuilder.group({
    email: ['123', Validators.required],
    password: ['123', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _apollo: Apollo,
    private _authStoreService: AuthStoreService,
    private _router: Router
  ) { }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);

    if (this.profileForm.valid) {
      const formValues = this.profileForm.value;

      this._apollo.mutate({
        mutation: LoginMutation.auth_local,
        variables: formValues
      }).subscribe(
        ({ data }) => {
          console.log(data);

          if (data && data.auth_local) {
            this._authStoreService.authInfo = data.auth_local;
            this._router.navigateByUrl('main');
          }
        },
        e => {
          console.error(e);
        }
      );
    }
  }
}
