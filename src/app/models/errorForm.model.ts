export interface MensajeForm { 
    mensaje: String,
    tipo: MensajeFormTipo
}

export enum MensajeFormTipo {
    WARNING,
    ERROR,
    SUCCESS
}