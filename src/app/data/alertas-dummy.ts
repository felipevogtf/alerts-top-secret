import { AlertaEstado } from "../models/alerta/alerta-estado.model";
import { AlertaTipo } from "../models/alerta/alerta-tipo.model";

export const alertasDummy = [
    {
        id: 1,
        tipo: AlertaTipo.CARRAZO,
        zona: 1,
        caja: 1,
        hora: '21:58',
        fecha: '29-06-2023',
        estado: AlertaEstado.SIN_GESTIONAR,
        estado_gestion: null
    },
    {
        id: 1,
        tipo: AlertaTipo.BOLSAZO,
        zona: 1,
        caja: 1,
        hora: '21:46',
        fecha: '29-06-2023',
        estado: AlertaEstado.SIN_GESTIONAR,
        estado_gestion: null
    },
    {
        id: 1,
        tipo: AlertaTipo.SCO,
        zona: 1,
        caja: 1,
        hora: '21:46',
        fecha: '29-06-2023',
        estado: AlertaEstado.SIN_GESTIONAR,
        estado_gestion: null
    },
    {
        id: 1,
        tipo: AlertaTipo.SIMULACION,
        zona: 1,
        caja: 1,
        hora: '21:46',
        fecha: '29-06-2023',
        estado: AlertaEstado.SIN_GESTIONAR,
        estado_gestion: null
    },
    {
        id: 1,
        tipo: AlertaTipo.PRUEBA,
        zona: 1,
        caja: 1,
        hora: '21:46',
        fecha: '29-06-2023',
        estado: AlertaEstado.SIN_GESTIONAR,
        estado_gestion: null
    },
]