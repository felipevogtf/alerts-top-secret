import { AlertaTipo } from '../models/alerta/alerta-tipo.model';

export interface MotivoDescarte {
  value: number;
  text: string;
}

export interface TipoAlertaConMotivos {
  tipo: AlertaTipo;
  motivosDescarte: MotivoDescarte[];
}

const motivosDescarte = {
  1: {
    id: 1,
    value: 'Multicompra',
  },
  2: {
    id: 2,
    value: 'Error de Reconocimiento',
  },
  3: {
    id: 3,
    value: 'Sin Control',
  },
  4: {
    id: 4,
    value: 'Prueba',
  },
  5: {
    id: 5,
    value: 'Bolsa Reutilizable',
  },
  6: {
    id: 6,
    value: 'Cambio de Caja',
  },
  7: {
    id: 7,
    value: 'Carro de otro cliente',
  },
  8: {
    id: 8,
    value: 'Cliente Devuelve Productos',
  },
  9: {
    id: 9,
    value: 'Intervención Cajera',
  },
  10: {
    id: 10,
    value: 'Carro Uso Interno',
  },
  11: {
    id: 11,
    value: 'Carro Vacío',
  },
  12: {
    id: 12,
    value: 'Cliente Pagó en SCO',
  },
  13: {
    id: 13,
    value: 'Cliente lleva productos cancelados previamente',
  },
};

export const tiposDeAlerta = [
  {
    tipo: AlertaTipo.SCO,
    motivosDescarte: [
      motivosDescarte[1],
      motivosDescarte[2],
      motivosDescarte[3],
    ],
  },
  {
    tipo: AlertaTipo.CARRAZO,
    motivosDescarte: [motivosDescarte[1], motivosDescarte[2]],
  },
  {
    tipo: AlertaTipo.BOLSAZO,
    motivosDescarte: [motivosDescarte[1]],
  },
  {
    tipo: AlertaTipo.SIMULACION,
    motivosDescarte: [motivosDescarte[1]],
  },
  {
    tipo: AlertaTipo.PRUEBA,
    motivosDescarte: [motivosDescarte[1], motivosDescarte[2]],
  },
];
