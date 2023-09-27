import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MensajeFormTipo, MensajeForm } from 'src/app/models/errorForm.model';
import { Usuario } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss'],
})
export class RegistroUsuariosComponent implements OnInit {
  registerForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    rut: ['', Validators.required],
    user_type: ['', Validators.required],
  });

  MensajeFormTipo = MensajeFormTipo;
  mensaje: MensajeForm | null = null;
  isLoading: Boolean = false;
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {}

  registrar() {
    this.mensaje = null;

    if (this.registerForm.invalid) {
      this.mensaje = {
        mensaje: 'Complete todos los campos',
        tipo: MensajeFormTipo.WARNING,
      };
      return;
    }

    const data: Usuario = {
      first_name: this.registerForm.value.first_name!,
      last_name: this.registerForm.value.last_name!,
      username: this.registerForm.value.rut!,
      rut: this.registerForm.value.rut!,
      user_type: this.registerForm.value.user_type!,
      password: this.registerForm.value.rut!,
    };

    this.setLoading(true);
    this.userService.registrar(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.mensaje = {
          mensaje: 'Usuario registrado con exito',
          tipo: MensajeFormTipo.SUCCESS,
        };

        this.setLoading(false);
      },
      error: (error: Error) => {
        this.mensaje = {
          mensaje: error.message,
          tipo: MensajeFormTipo.ERROR,
        };
        console.error('Error en la solicitud:', error);
        this.setLoading(false);
      },
    });
  }

  setLoading(isLoading: Boolean) {
    if (isLoading) {
      this.isLoading = true;
      this.registerForm.disable();
    } else {
      this.isLoading = false;
      this.registerForm.enable();
    }
  }

  obtenerClaseMensaje(): string {
    let clase = '';
    if (this.mensaje) {
      switch (this.mensaje.tipo) {
        case MensajeFormTipo.ERROR:
          clase = 'register-error';
          break;
        case MensajeFormTipo.SUCCESS:
          clase = 'register-success';
          break;
        case MensajeFormTipo.WARNING:
          clase = 'register-warning';
          break;
      }
    }

    return clase;
  }
}
