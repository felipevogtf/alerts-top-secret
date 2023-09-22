export interface ErrorForm { 
    mensaje: String,
    tipo: ErrorFormTipo
}

export enum ErrorFormTipo {
    WARNING,
    ERROR
}