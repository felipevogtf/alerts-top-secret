import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { IonicModule } from '@ionic/angular';
import { authGuardCheck } from 'src/app/guards/auth.guard';

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
        canActivate: [authGuardCheck],
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./gestion-usuarios/gestion-usuarios.module').then(
            (m) => m.GestionUsuariosModule
          ),
        canActivate: [authGuardCheck],
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [authGuardCheck],
      },
    ],
  },
];

@NgModule({
  declarations: [InicioComponent],
  imports: [IonicModule, CommonModule, RouterModule.forChild(routes)],
})
export class InicioModule {}
