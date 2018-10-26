import {AbstractControl} from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmpassword = AC.get('confirmpassword').value;
    if(password !== confirmpassword) {
      AC.get('confirmpassword').setErrors( {MatchPassword: true})
    } else {
      return null;
    }
  }
}