import { Component, OnInit } from '@angular/core';
import { AlertaPaso } from '../models/steps.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { Alerta } from 'src/app/models/alerta/alerta.model';

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

  cerrar() {
    this.router.navigate(['/']);
  }

  changeStep(paso: AlertaPaso): void {
    this.currentPaso = paso;
  }

  descartarAlerta() {
    this.changeStep(AlertaPaso.Gestion);
  }

  controlBoleta() {
    this.changeStep(AlertaPaso.Gestion);
  }

  obtenerBackground(paso: AlertaPaso): String {
    if (paso == AlertaPaso.Preview) {
      return 'background-danger';
    } else {
      return 'background-default';
    }
  }
}
