import { Component } from '@angular/core';
import { AlertaService } from './services/alerta.service';
import { alertasDummy } from './data/alertas-dummy';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alertaService: AlertaService, private router: Router) {}

  ngOnInit(): void {
    alertasDummy.forEach((alerta) => {
      //this.alertaService.agregarAlerta(alerta);
    });

    this.alertaService.suscribirseAlertas().subscribe((alertas) => {
      console.log(alertas);
      // this.router.navigate(['/home']);

      setTimeout(() => {
        this.router.navigate(['/alerta', alertas[0].id]);
      }, 1);
    });

    this.alertaService.alertasSubscribe();
  }
}
