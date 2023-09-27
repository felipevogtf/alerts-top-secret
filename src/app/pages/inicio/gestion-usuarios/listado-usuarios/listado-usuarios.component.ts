import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss'],
})
export class ListadoUsuariosComponent implements OnInit {
  isLoading: Boolean = false;
  usuarios: Usuario[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.setLoading(true);
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.usuarios = response;
        this.setLoading(false);
      },
      error: (error: Error) => {
        console.error('Error en la solicitud:', error);
        this.setLoading(false);
      },
    });
  }

  setLoading(isLoading: Boolean) {
    if (isLoading) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  }
}
