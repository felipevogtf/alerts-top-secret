import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  retry,
  throwError,
} from 'rxjs';
import { LoginData, LoginResponse } from '../models/login/login.model';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private loginSubject = new BehaviorSubject<boolean>(false);

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
        this.storageService.remove('_t');
        this.storageService.remove('_r');
        this.storageService.remove('_ut');
        res(true);
      } catch (error) {
        rej();
      }
    });
  }

  loginState(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  setLoginState(value: boolean): void {
    if (value !== this.loginSubject.value) {
      this.loginSubject.next(value);
    }
  }

  async isLogged(): Promise<boolean> {
    const token = await this.storageService.get('_t');
    return token ? true : false;
  }
}
