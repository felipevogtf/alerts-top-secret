import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private storage: Storage) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.has('AuthorizationRequired')) {
      return from(this.storage.get('_t')).pipe(
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
            return throwError('No se proporcionó un token de autorización.');
          }
        })
      );
    }

    return next.handle(req);
  }
}
