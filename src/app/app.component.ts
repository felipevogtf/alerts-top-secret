import { Component } from '@angular/core';
import { AlertaService } from './services/alerta.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private alertaService: AlertaService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Conectarse al ws solo cuando este loggeado
    this.authService.loginState().subscribe((isLogged) => {
      if (isLogged) {
        console.log("esta logeado conectar ws")
        this.alertaService.alertasSubscribe();
      } else {
        console.log("no esta logeado desconectar ws")
        this.alertaService.alertasUnSubscribe();
      }
    });

    // Suscribirse a las alertas
    this.alertaService.suscribirseAlertas().subscribe((alertas) => {
      setTimeout(() => {
        this.router.navigate(['/alerta', alertas[0].id]);
      }, 1);
    });
  }
}
