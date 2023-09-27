import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ListadoUsuariosComponent,
  },
  {
    path: 'registro',
    component: RegistroUsuariosComponent,
  },
];

@NgModule({
  declarations: [ListadoUsuariosComponent, RegistroUsuariosComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class GestionUsuariosModule {}
