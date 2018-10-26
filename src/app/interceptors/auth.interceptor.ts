import { config } from './../services/config';
import { AuthenticationService } from './../services/authentication.service';
import { Observable } from 'rxjs/Rx';
import { Injectable, Injector } from '@angular/core';
import {Router} from "@angular/router";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
      private injector: Injector,
      private router: Router
  ) {}

  isSiteUrl(url: string): boolean {
    const rg = new RegExp(config.url, 'ig');
    return rg.test(url);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthenticationService);
    const token = auth.token;

    if (token && this.isSiteUrl(req.url)) {
      const authReq = req.clone({
        headers: req.headers.set('JSESSIONID', token)
      });

      return this.next(next.handle(authReq));
    }

    return this.next(next.handle(req));
  }

  private next(next){
      return next.do((event: HttpEvent<any>) => {
      }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {
                  this.router.navigate(['/lg']);
                  return false;
              }
          }
          return next;
      });
  }
}
