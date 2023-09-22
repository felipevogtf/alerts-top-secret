import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaEstado } from 'src/app/models/alerta/alerta-estado.model';
import { Alerta } from 'src/app/models/alerta/alerta.model';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-listado-alertas',
  templateUrl: './listado-alertas.component.html',
  styleUrls: ['./listado-alertas.component.scss'],
})
export class ListadoAlertasComponent implements OnInit {
  alertas: Alerta[] = [];
  currentDate: Date = new Date();
  isLoading: Boolean = false;

  constructor(
    private alertaService: AlertaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerAlertas();

    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  obtenerAlertas() {
    this.setLoading(true);
    this.alertaService.getAlertas().subscribe({
      next: (response) => {
        this.alertaService.setAlertas(response);
        this.alertas = this.alertaService.alertas;

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

  verAlerta(id: Number): void {
    this.router.navigate(['/alerta', id]);
  }

  verificarEstado(alerta: Alerta): AlertaEstado {
    const fechaActual = new Date();

    if (alerta.fechaVencimiento) {
      return fechaActual.getTime() >= alerta.fechaVencimiento.getTime()
        ? AlertaEstado.VENCIDA
        : alerta.estado;
    } else {
      return alerta.estado;
    }
  }

  obtenerClaseAlerta(alerta: Alerta): String {
    const estado = this.verificarEstado(alerta);
    let clase = '';

    switch (estado) {
      case AlertaEstado.GESTIONADA:
        clase = 'card-success';
        break;
      case AlertaEstado.SIN_GESTIONAR:
        clase = 'card-danger';
        break;
      case AlertaEstado.VENCIDA:
        clase = 'card-medium';
        break;
      case AlertaEstado.GESTION_INCOMPLETA:
        clase = 'card-warning';
        break;
    }

    return clase;
  }
}
