import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedReq = request.clone({
      withCredentials: true
    });
    return next.handle(clonedReq).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if ((err.status === 401) || (err.status === 403)) {
            this.router.navigate(['/auth/login']);
          } else {
            return;
          }
        }
      }));
  }
}