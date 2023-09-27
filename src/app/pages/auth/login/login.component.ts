import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajeForm, MensajeFormTipo } from 'src/app/models/errorForm.model';
import { LoginData, LoginResponse } from 'src/app/models/login/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  MensajeFormTipo = MensajeFormTipo;
  error: MensajeForm | null = null;
  showPassword: Boolean = false;

  isLoading: Boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.error = null;

    if (this.loginForm.invalid) {
      this.error = {
        mensaje: 'Complete todos los campos',
        tipo: MensajeFormTipo.WARNING,
      };
      return;
    }

    const data: LoginData = {
      rut: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };

    this.setLoading(true);
    this.authService.login(data).subscribe({
      next: (response: LoginResponse) => {
        this.storageService.set('_t', response.token);
        this.storageService.set('_r', response.rut);
        this.storageService.set('_ut', response.user_type);
        this.setLoading(false);

        this.router.navigate(['/inicio']);
      },
      error: (error: Error) => {
        this.error = {
          mensaje: error.message,
          tipo: MensajeFormTipo.ERROR,
        };
        console.error('Error en la solicitud:', error);
        this.setLoading(false);
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  setLoading(isLoading: Boolean) {
    if (isLoading) {
      this.isLoading = true;
      this.loginForm.disable();
    } else {
      this.isLoading = false;
      this.loginForm.enable();
    }
  }
}
