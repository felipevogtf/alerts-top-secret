import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      AuthorizationRequired: 'true',
    }),
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${environment.apiUrl}/users/list/`, this.headers)
      .pipe(
        retry(3),
        catchError((error) => {
          let errorMessage =
            'Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo más tarde.';

          console.error(error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  registrar(data: Usuario): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/users/sign-up/`, data, this.headers)
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
} 
