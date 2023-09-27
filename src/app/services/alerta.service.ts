import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, retry, throwError } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AlertaEstado } from '../models/alerta/alerta-estado.model';
import { AlertaTipo, alertaTipoMap } from '../models/alerta/alerta-tipo.model';
import {
  Alerta,
  AlertaApi,
  AlertaGestion,
  AlertaSocket,
} from '../models/alerta/alerta.model';
import { addMinutes, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  alertas: Alerta[] = [];
  private alertasSubject: Subject<Alerta[]> = new Subject<Alerta[]>();
  isSocketSuscribe: boolean = false;

  webSocket: WebSocketSubject<AlertaSocket> = webSocket(environment.socketUrl);
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      AuthorizationRequired: 'true',
    }),
  };

  constructor(private http: HttpClient) {}

  getAlertas(): Observable<Alerta[]> {
    return this.http
      .get<AlertaApi[]>(
        `${environment.apiUrl}/notification/alarms_list/`,
        this.headers
      )
      .pipe(
        retry(3),
        catchError((error) => {
          let errorMessage =
            'Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo más tarde.';

          console.error(error);
          return throwError(() => new Error(errorMessage));
        }),
        map((data: AlertaApi[]) => {
          return data.map((data) => {
            let fechaAlerta = utcToZonedTime(
              parseISO(data.datetime),
              'Etc/UTC'
            );
            const fechaVencimiento = addMinutes(fechaAlerta, 1);

            const alerta: Alerta = {
              id: data.id,
              tipo: alertaTipoMap[data.alert_type] ?? AlertaTipo.PRUEBA,
              zona: data.office,
              caja: data.paydesk,
              fecha: fechaAlerta,
              estado: AlertaEstado.SIN_GESTIONAR,
              estado_gestion: null,
              fechaVencimiento: fechaVencimiento,
            };

            return alerta;
          });
        })
      );
  }

  getAlerta(id: number): Observable<Alerta> {
    return this.http
      .get<AlertaApi>(
        `${environment.apiUrl}/notification/alarm/${id}`,
        this.headers
      )
      .pipe(
        retry(3),
        catchError((error) => {
          let errorMessage =
            'Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo más tarde.';

          console.error(error);
          return throwError(() => new Error(errorMessage));
        }),
        map((data: AlertaApi) => {
          let fechaAlerta = utcToZonedTime(parseISO(data.datetime), 'Etc/UTC');
          const fechaVencimiento = addMinutes(fechaAlerta, 1);

          const alerta: Alerta = {
            id: data.id,
            tipo: alertaTipoMap[data.alert_type] ?? AlertaTipo.PRUEBA,
            zona: data.office,
            caja: data.paydesk,
            fecha: fechaAlerta,
            estado: AlertaEstado.SIN_GESTIONAR,
            estado_gestion: null,
            fechaVencimiento: fechaVencimiento,
            imagen: data.image,
            ultimasCompras: data.last_transactions,
          };

          return alerta;
        })
      );
  }

  gestionar(data: AlertaGestion, id: number): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiUrl}/notification/alarm/categorize/${id}/`,
        data,
        this.headers
      )
      .pipe(
        retry(3),
        catchError((error) => {
          let errorMessage =
            'Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo más tarde.';

          console.error(error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  setAlertas(alertas: Alerta[]): void {
    this.alertas = alertas;
  }

  // Método para agregar una nueva alerta
  agregarAlerta(alerta: Alerta): void {
    this.alertas.unshift(alerta);
    this.alertasSubject.next(this.alertas);
  }

  // Método para obtener el observable de alertas
  suscribirseAlertas(): Observable<Alerta[]> {
    return this.alertasSubject.asObservable();
  }

  agregarAlertaPrueba(tipo: AlertaTipo): void {
    const fecha = new Date();
    const nuevaAlerta: Alerta = {
      id: this.alertas.length,
      tipo: tipo,
      zona: 1,
      caja: 1,
      fecha: fecha,
      estado: AlertaEstado.SIN_GESTIONAR,
      estado_gestion: null,
    };

    this.agregarAlerta(nuevaAlerta);
  }

  obtenerPorId(id: number): Alerta | undefined {
    return this.alertas.find((alerta) => alerta.id == id);
  }

  alertasSubscribe() {
    // Crear un objeto Observer
    const observer = {
      next: (alerta: Alerta) => {
        console.log('Alerta nueva', alerta.fecha);
        this.agregarAlerta(alerta);
      },
      error: (error: any) => {
        if (this.isSocketSuscribe) {
          this.alertasSubscribe();
        }
        console.error('Error:', error);
      },
      complete: () => {
        console.log(this.isSocketSuscribe)
        if (this.isSocketSuscribe) {
          this.alertasSubscribe();
        }
        console.log('Conexión cerrada');
      },
    };

    // Suscribirse al WebSocket usando el objeto Observer
    this.webSocket
      .pipe(
        map((alertaSocket: AlertaSocket) => {
          const alertaContent = alertaSocket.alarm_data;

          let fechaAlerta = utcToZonedTime(
            parseISO(alertaContent.datetime),
            'Etc/UTC'
          );
          const fechaVencimiento = addMinutes(fechaAlerta, 1);

          const alerta: Alerta = {
            id: alertaContent.id,
            tipo: alertaTipoMap[alertaContent.alert_type] ?? AlertaTipo.PRUEBA,
            zona: alertaContent.office,
            caja: alertaContent.paydesk,
            fecha: fechaAlerta,
            estado: AlertaEstado.SIN_GESTIONAR,
            estado_gestion: null,
            fechaVencimiento: fechaVencimiento,
            imagen: alertaContent.image,
            ultimasCompras: alertaContent.last_transactions,
          };

          return alerta;
        })
      )
      .subscribe(observer);

    this.isSocketSuscribe = true;
  }

  alertasUnSubscribe() {
    if (this.isSocketSuscribe) {
      this.isSocketSuscribe = false;
      this.webSocket.complete();
    }
  }
}
