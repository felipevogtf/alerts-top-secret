import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.has('AuthorizationRequired')) {
      return from(this.storageService.get('_t')).pipe(
        switchMap((token) => {
          if (token) {
            // Elimina el encabezado personalizado 'AuthorizationRequired'
            const clonedReq = req.clone({
              headers: req.headers.delete('AuthorizationRequired'),
              setHeaders: {
                Authorization: `Token ${token}`,
              },
            });
            return next.handle(clonedReq);
          } else {
            this.router.navigate(['/login']);
            return throwError('No se proporcionó un token de autorización.');
          }
        })
      );
    }

    return next.handle(req);
  }
}
