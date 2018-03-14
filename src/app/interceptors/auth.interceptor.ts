import { AuthenticationService } from './../services/authentication.service';
import { Observable } from 'rxjs/Rx';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthenticationService);
    const token = auth.token;

    if (token) {
      const authReq = req.clone({ headers: req.headers.set('JSESSIONID', token) });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
