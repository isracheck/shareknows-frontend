import { HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from './token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


const TOKEN_HEADER_KEY = 'Authorization';

// Adds bearer token to HTTP Request
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private token: TokenStorageService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    // return next.handle(authReq);
    return next.handle(authReq).pipe(
      catchError((error: Error) => {
        if (error instanceof HttpErrorResponse) {
          console.log('ERROR', error);
          switch (error.status) {
            case 403:
              this.router.navigate(['/login'], { queryParams: { message: 'Unauthorized' } });
              return throwError(error);

            default:
              return throwError(error);
          }

        } else {
          return throwError(error);
        }
      })
    );

  }
}
