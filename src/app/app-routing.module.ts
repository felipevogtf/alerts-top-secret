import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuardCheck } from './guards/auth.guard';
import { loginGuardCheck } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/inicio/inicio.module').then((m) => m.InicioModule),
    canActivate: [authGuardCheck],
  },
  {
    path: 'alerta/:id',
    loadChildren: () =>
      import('./pages/alerta/alerta.module').then((m) => m.AlertaModule),
    canActivate: [authGuardCheck],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [loginGuardCheck],
  },
  {
    path: '**', // Ruta comodín para capturar rutas que no existen
    redirectTo: '', // Redirige a la ruta raíz o la ruta que desees
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
