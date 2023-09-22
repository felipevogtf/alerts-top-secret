import { Component, Input, OnInit } from '@angular/core';
import { Alerta } from 'src/app/models/alerta/alerta.model';

@Component({
  selector: 'alerta-preview',
  templateUrl: './alerta-preview.component.html',
  styleUrls: ['./alerta-preview.component.scss'],
})
export class AlertaPreviewComponent  implements OnInit {

  @Input() alerta: Alerta | null = null;

  constructor() { }

  ngOnInit() {}

}
