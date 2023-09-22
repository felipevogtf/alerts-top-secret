import { Component, OnInit } from '@angular/core';
import { AlertaTipo } from 'src/app/models/alerta/alerta-tipo.model';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {

  constructor(
    private alertaService: AlertaService
  ) { }

  ngOnInit() {}

  test() : void{
    this.alertaService.agregarAlertaPrueba(AlertaTipo.PRUEBA)
  }

}
