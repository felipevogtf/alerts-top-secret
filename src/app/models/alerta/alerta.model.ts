import { AlertaEstadoGestion } from './alerta-estado-gestion.model';
import { AlertaEstado } from './alerta-estado.model';
import { AlertaTipo } from './alerta-tipo.model';

export interface Alerta {
  id: Number;
  tipo: AlertaTipo;
  zona: number;
  caja: number;
  fecha: Date;
  estado: AlertaEstado;
  estado_gestion: AlertaEstadoGestion | null;
  fechaVencimiento?: Date;
  imagen?: string;
  ultimasCompras?: LastTransaction[]
}

export interface AlertaSocket {
  alarm_data: AlertaApi;
}

export interface AlertaApi {
  id: number;
  paydesk: number;
  office: number;
  cam_id: number;
  alarm: boolean;
  datetime: string;
  solved: boolean;
  losses: number;
  discard: string;
  recovery: string | null;
  displayed_dt: string;
  managed_dt: string | null;
  alert_type: string;
  folio: string;
  image: string;
  last_transactions: LastTransaction[];
}

export interface AlertaGestion {
  is_alarm: boolean;
  losses: number;
  recover: boolean;
  discard: number;
}


export interface LastTransaction {
  id: number;
  paydesk: number;
  datetime: string;
  image: string;
}
