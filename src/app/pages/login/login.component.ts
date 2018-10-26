import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../interfaces/index';
import { AuthenticationService } from '../../services/index';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss'],
})

export class LoginComponent {

  user: User = {
    username: '',
    password: '',
    isAdmin:'',
    isUser: ''
  };
  loginForm: FormGroup;
  submitted: boolean = false;
  dataLoading: boolean = false;
  error: String = '';
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
    // // }
    // this.loginForm = this.fb.group({
    //   username: [localStorage.getItem('username') || '', [<any>Validators.required]],
    //   password: [localStorage.getItem('password') || '', [<any>Validators.required]]
    // });
  }

  login(): void {
    this.submitted = true;
    this.dataLoading = true;
    const name = this.user.username;
    const pwd = this.user.password;

    this.authenticationService.login(name, pwd)
      .then(data => {
        localStorage.setItem('username', name);
        localStorage.setItem('password', pwd);
        this.router.navigate(['/home']);
        this.dataLoading = false;
      })
      .catch((error) => console.log(error));
  }
}
