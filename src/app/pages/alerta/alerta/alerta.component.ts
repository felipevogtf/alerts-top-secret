import { Component, OnInit } from '@angular/core';
import { AlertaPaso } from '../models/steps.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { Alerta, AlertaGestion } from 'src/app/models/alerta/alerta.model';
import { AlertaEstadoGestion } from 'src/app/models/alerta/alerta-estado-gestion.model';
import { AlertaEstado } from 'src/app/models/alerta/alerta-estado.model';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss'],
})
export class AlertaComponent implements OnInit {
  AlertaPasos = AlertaPaso;
  currentPaso: AlertaPaso = AlertaPaso.Preview;
  alerta: Alerta | null | undefined = null;
  alertaExist: Boolean = false;
  isLoading: Boolean = false;
  isGestionLoading: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertaService: AlertaService
  ) {
    this.alertaExist = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.alerta = this.alertaService.obtenerPorId(parseInt(id));

        if (!this.alerta || !this.alerta!!.imagen) {
          this.alertaExist = false;
          this.obtenerAlerta(parseInt(id));
        } else {
          this.alertaExist = true;
        }
      }
    });
  }

  obtenerAlerta(id: Number) {
    this.setLoading(true);
    this.alertaService.getAlerta(id).subscribe({
      next: (response) => {
        this.alerta = response;
        this.alertaExist = true;
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

  setGestionLoading(isLoading: Boolean) {
    if (isLoading) {
      this.isGestionLoading = true;
    } else {
      this.isGestionLoading = false;
    }
  }

  cerrar() {
    this.router.navigate(['/']);
  }

  changeStep(paso: AlertaPaso): void {
    this.currentPaso = paso;
  }

  descartarAlerta() {
    if (this.alerta) {
      this.alerta.estado_gestion = AlertaEstadoGestion.ALERTA_DESCARTADA;
      this.alerta.estado = AlertaEstado.GESTION_INCOMPLETA;
      this.changeStep(AlertaPaso.Gestion);
    }
  }

  controlBoleta() {
    if (this.alerta) {
      this.alerta.estado_gestion = AlertaEstadoGestion.CONTROL_BOLETA;
      this.alerta.estado = AlertaEstado.GESTION_INCOMPLETA;
      this.changeStep(AlertaPaso.Gestion);
    }
  }

  gestionar() {
    if (!this.alerta) {
      return;
    }

    const data: AlertaGestion = {
      is_alarm: true,
      losses: 100,
      recover: false,
      discard: 1,
    };

    this.setGestionLoading(true);
    this.alertaService.gestionar(data, this.alerta.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.setGestionLoading(false);
      },
      error: (error: Error) => {
        console.error('Error en la solicitud:', error);
        this.setGestionLoading(false);
      },
    });
  }

  obtenerBackground(paso: AlertaPaso): String {
    if (paso == AlertaPaso.Preview) {
      return 'background-danger';
    } else {
      return 'background-default';
    }
  }
}
