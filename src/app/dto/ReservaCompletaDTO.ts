export class ReservaCompletaDTO {
    idReserva: number;
    nombre: string;
    apellido: string;
    fechaReserva: string;
    cantidadPersonas: string;
    tipoReserva: string;
    observaciones: string;
    estado: string;

    constructor(){
        this.idReserva = 0;
        this.nombre = '';
        this.apellido = '';
        this.fechaReserva = '';
        this.cantidadPersonas = '';
        this.tipoReserva = '';
        this.observaciones = '';
        this.estado = '';
    }
}