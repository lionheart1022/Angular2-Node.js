import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
function _window(): any {
  // return the global native browser window object
  return window;
}
@Injectable()
export class WindowRef {
  public with_wrap$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get nativeWindow(): any {
    return _window();
  }
}
