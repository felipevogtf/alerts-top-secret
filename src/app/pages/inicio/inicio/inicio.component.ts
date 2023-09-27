import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaTipo } from 'src/app/models/alerta/alerta-tipo.model';
import { AlertaService } from 'src/app/services/alerta.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  constructor(
    private alertaService: AlertaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  test(): void {
    this.alertaService.agregarAlertaPrueba(AlertaTipo.PRUEBA);
  }

  logout() {
    this.authService.logout().then((data: any) => {
      this.router.navigate(['/login']);
    });
  }
}
