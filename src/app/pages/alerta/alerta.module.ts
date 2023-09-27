import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaComponent } from './alerta/alerta.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlertaPreviewComponent } from './alerta-preview/alerta-preview.component';
import { AlertaGestionComponent } from './alerta-gestion/alerta-gestion.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AlertaComponent,
    children: [],
  },
];

@NgModule({
  declarations: [
    AlertaComponent,
    AlertaPreviewComponent,
    AlertaGestionComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
})
export class AlertaModule {}
