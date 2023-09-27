import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() motivoDescarte = new EventEmitter<number | null>();
  @Output() montoRecuperacion = new EventEmitter<number>();
  @Output() detenido = new EventEmitter<boolean>();
  @Output() recuperacion = new EventEmitter<boolean>();
  @Output() back = new EventEmitter<void>();

  AlertaEstadoGestion = AlertaEstadoGestion;
  listadoOpciones: any[] = [];

  opcionDescarteSeleccionado: number | null = null;
  opcionDetenido: boolean = false;
  opcionMontoRecuperacion: boolean = false;
  valorMontoRecuperacion: number = 0;

  constructor() {}

  ngOnInit() {
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

  seleccionarOpcion(indice: number): void {
    if (indice === this.opcionDescarteSeleccionado) {
      this.opcionDescarteSeleccionado = null;
      this.motivoDescarte.emit(null);
    } else {
      this.opcionDescarteSeleccionado = indice;
      this.motivoDescarte.emit(
        this.listadoOpciones[this.opcionDescarteSeleccionado].id
      );
    }
  }

  seleccionarSinRecuperacion() {
    if (this.opcionMontoRecuperacion) {
      this.opcionMontoRecuperacion = false;
    } else {
      this.valorMontoRecuperacion = 0;
      this.opcionMontoRecuperacion = true;
    }

    this.montoRecuperacion.emit(this.valorMontoRecuperacion);
    this.recuperacion.emit(this.opcionMontoRecuperacion);
  }

  seleccionarDetenido() {
    this.opcionDetenido = !this.opcionDetenido;
    this.detenido.emit(this.opcionDetenido);
  }

  cambiarMontoRecuperacion() {
    this.montoRecuperacion.emit(this.valorMontoRecuperacion);
  }

  pasoAnterior() {
    this.back.emit();
  }
}
