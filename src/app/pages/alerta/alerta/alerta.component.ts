import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaPaso } from '../models/steps.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { Alerta, AlertaGestion } from 'src/app/models/alerta/alerta.model';
import { AlertaEstadoGestion } from 'src/app/models/alerta/alerta-estado-gestion.model';
import { AlertaEstado } from 'src/app/models/alerta/alerta-estado.model';
import { ToastController } from '@ionic/angular';

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

  descarte: number = 0;
  recuperacion: boolean = false;
  detenido: boolean = false;
  montoRecuperacion: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertaService: AlertaService,
    private toastController: ToastController
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

  ionViewWillLeave() {
    this.alerta = null;
    this.alertaExist = false;
    this.isLoading = false;
    this.isGestionLoading = false;
    this.currentPaso = AlertaPaso.Preview;
  }

  obtenerAlerta(id: number) {
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

  obtenerMotivoDescarte(motivo: number | null) {
    if (motivo) {
      this.descarte = motivo;
    } else {
      this.descarte = 0;
    }
  }

  obtenerMontoRecuperacion(monto: number | null) {
    if (monto) {
      this.montoRecuperacion = monto;
    } else {
      this.montoRecuperacion = 0;
    }
  }

  obtenerDetenido(detenido: boolean) {
    this.detenido = detenido;
  }

  obtenerRecuperacion(recuperacion: boolean) {
    this.recuperacion = recuperacion;
  }

  gestionar() {
    if (!this.alerta) {
      return;
    }

    const data: AlertaGestion = {
      is_alarm: this.detenido,
      losses: this.montoRecuperacion,
      recover: this.recuperacion,
      discard: this.descarte,
    };

    this.setGestionLoading(true);
    this.alertaService.gestionar(data, this.alerta.id).subscribe({
      next: (response: any) => {
        this.presentToast('top', 'Alerta gestionada con exito!');
        this.router.navigate(['/']);
        this.setGestionLoading(false);
      },
      error: (error: Error) => {
        this.presentToast('top', 'Ha ocurrido un problema, intente nuevamente');
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

  async presentToast(position: 'top' | 'middle' | 'bottom', mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: position,
      color: 'dark',
    });

    await toast.present();
  }

  pasoAnterior() {
    this.currentPaso = AlertaPaso.Preview;
  }
}
