export enum AlertaTipo {
  SCO = 'SCO',
  CARRAZO = 'CARRAZO',
  BOLSAZO = 'BOLSAZO',
  SIMULACION = 'SIMULACIÓN',
  PRUEBA = 'PRUEBA',
}

export const alertaTipoMap: { [key: string]: AlertaTipo } = {
  carrazo: AlertaTipo.CARRAZO,
  bolzaso: AlertaTipo.BOLSAZO,
  simulacion: AlertaTipo.SIMULACION,
  prueba: AlertaTipo.PRUEBA,
  sco: AlertaTipo.SCO,
};
