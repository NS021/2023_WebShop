import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = new FormControl('');
  password = new FormControl('');

  loading: boolean = false;

  constructor(private router: Router, private loadingService: FakeLoadingService, private authService: AuthService) {}


  login() {
    this.loading = true;
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || ''; 
   /* this.loadingService.loadingWithPromise(emailValue, passwordValue)
      .then((_: boolean) => {
        this.router.navigateByUrl('/main');
      })
      .catch(error => {
        console.error(error);
        this.loading = false;
      })
      .finally(() => {
        console.log('Sikeres betöltés');
        this.loading = false;
      });*/
      this.authService.login(emailValue, passwordValue).then(cred => {
        this.router.navigateByUrl('/main');
        this.loading = false;
      }).catch(error => {
        console.error(error);
        this.loading = false;
      });
  }
}
