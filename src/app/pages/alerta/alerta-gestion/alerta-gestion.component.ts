import { Component, Input, OnInit } from '@angular/core';
import {
  MotivoDescarte,
  TipoAlertaConMotivos,
  tiposDeAlerta,
} from 'src/app/data/alertas-motivos-descarte';
import { AlertaEstadoGestion } from 'src/app/models/alerta/alerta-estado-gestion.model';
import { AlertaTipo } from 'src/app/models/alerta/alerta-tipo.model';
import { Alerta } from 'src/app/models/alerta/alerta.model';

@Component({
  selector: 'alerta-gestion',
  templateUrl: './alerta-gestion.component.html',
  styleUrls: ['./alerta-gestion.component.scss'],
})
export class AlertaGestionComponent implements OnInit {
  @Input() alerta: Alerta | null = null;
  AlertaEstadoGestion = AlertaEstadoGestion;
  listadoOpciones: any[] = [];

  opcionSeleccionada: Number | null = null;

  constructor() {}

  ngOnInit() {
    console.log(this.alerta);

    if (this.alerta) {
      this.listadoOpciones = this.obtenerMotivosDescarte(this.alerta.tipo);
    }
  }

  obtenerMotivosDescarte(tipo: AlertaTipo) {
    let tipos = tiposDeAlerta.find((data) => data.tipo === tipo);

    if (tipos) {
      return tipos.motivosDescarte;
    } else {
      return [];
    }
  }

  seleccionarOpcion(indice: Number): void {
    if (indice === this.opcionSeleccionada) {
      this.opcionSeleccionada = null;
    } else {
      this.opcionSeleccionada = indice;
    }
  }
}
