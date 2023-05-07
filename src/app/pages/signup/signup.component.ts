import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from'../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  loading: boolean = false;

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  })

  constructor(private location: Location, private loadingService: FakeLoadingService, private router: Router, private authService: AuthService, private userService: UserService) {

  }

  onSubmit() {
    this.loading = true;
    const emailValue = this.signupForm.get('email')?.value || '';
    const firstnameValue = this.signupForm.get('name.firstname')?.value || '';
    const lastnameValue = this.signupForm.get('name.lastname')?.value || '';
    const passwordValue = this.signupForm.get('password')?.value || '';
    this.authService.signup(emailValue, passwordValue).then(cred =>{
      const user: User = {
        id:cred.user?.uid as string,
        email: emailValue,
        username: emailValue.split('@')[0],
        name: {
          firstname: firstnameValue,
          lastname: lastnameValue
        }
      };
      this.userService.create(user).then(_ => {
        this.loading = false;
        console.log('User added');
        this.router.navigateByUrl('/main');
      }).catch(error => {
        this.loading = false;
        console.error(error);
      })
    }).catch(error =>{
      this.loading = false;
      console.error(error);
    });
  }

  goBack() {
    this.location.back();
  }

}
