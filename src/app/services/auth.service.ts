import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { LoginData, LoginResponse } from '../models/login/login.model';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storagaService: StorageService
  ) {}

  login(data: LoginData): Observable<LoginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<LoginResponse>(
        `${environment.apiUrl}/users/login/`,
        data,
        httpOptions
      )
      .pipe(
        retry(3),
        catchError((error) => {
          let errorMessage =
            'Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo más tarde.';

          if (error.status === 400) {
            errorMessage =
              'Los datos proporcionados son inválidos. Por favor, verifica y vuelve a intentarlo.';
          } else if (error.status === 401) {
            errorMessage =
              'Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña.';
          }

          console.error(error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  logout() {
    return new Promise((res, rej) => {
      try {
        this.storagaService.remove('_t');
        this.storagaService.remove('_r');
        this.storagaService.remove('_ut');
        res(true);
      } catch (error) {
        rej();
      }
    });
  }
}
