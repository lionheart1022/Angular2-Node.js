import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../interfaces/index';
import { AuthenticationService } from '../../services/index';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})

export class LoginComponent {

  user: User = {
    username: '',
    password: ''
  };
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    // if (this.authenticationService.token){
    //   this.router.navigate(['/home']);
    // }
    this.loginForm = this.fb.group({
      username: [localStorage.getItem('username') || '', [<any>Validators.required]],
      password: [localStorage.getItem('password') || '', [<any>Validators.required]]
    });
  }

  login(form: any): void {
    this.submitted = true;
    if (form.valid) {
      this.authenticationService.login(form.value.username, form.value.password)
        .then(data => {
          localStorage.setItem('username', form.value.username);
          localStorage.setItem('password', form.value.password);
          this.router.navigate(['/home']);
        })
        .catch((error) => console.log(error));
    }
  }
}
