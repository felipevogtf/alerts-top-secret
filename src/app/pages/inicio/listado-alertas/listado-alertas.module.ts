import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListadoAlertasComponent } from './listado-alertas.component';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: ListadoAlertasComponent,
  },
];

@NgModule({
  declarations: [ListadoAlertasComponent],
  imports: [IonicModule, CommonModule, RouterModule.forChild(routes)],
})
export class ListadoAlertasModule {}
