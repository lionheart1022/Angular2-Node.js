import {AbstractControl} from '@angular/forms';

export class FormValidation {
  static MatchForm(AC: AbstractControl) {
    let username = AC.get('username').value;
    let password = AC.get('password').value;
    let confirmpassword = AC.get('confirmpassword').value;
    let roles = AC.get('roles').value;
    
    if (username == "") {
      AC.get('username').setErrors({NoInputUser: true});
    }

    if (username !="" && !FormValidation.isUsername(username)) {
      AC.get('username').setErrors({WrongUser: true});
    }

    if (password == "") {
      AC.get('password').setErrors({NoInputPassword: true});
    }
    if (password !="" && !FormValidation.isPassword(password)) {
      AC.get('password').setErrors({WrongPassword: true});
    }

    if (confirmpassword == "") {
      AC.get('confirmpassword').setErrors({NoInputCPassword: true});
    }

    if (!roles[0] && !roles[1]) {
      AC.get('roles').setErrors({NoRoles: true});
    }

    if (password !== confirmpassword) {
      AC.get('confirmpassword').setErrors( {MatchPassword: true});
    } else {
      return null;
    }
  }

  static isUsername(username) {
    var regex = /^[a-zA-Z_]{3,21}$/;
    return regex.test(username);
  }

  static isPassword(password) {
    // var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0,9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/;
    var regex = /^[a-zA-Z0-9!@#$%&*,.^_'~]{8,20}$/;
    return regex.test(password);
  }
}