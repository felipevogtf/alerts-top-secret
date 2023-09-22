import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./listado-alertas/listado-alertas.module').then(
            (m) => m.ListadoAlertasModule
          ),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./gestion-usuarios/gestion-usuarios.module').then(
            (m) => m.GestionUsuariosModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [InicioComponent],
  imports: [IonicModule, CommonModule, RouterModule.forChild(routes)],
})
export class InicioModule {}
