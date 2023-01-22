export class Booking {
    idReserva: number;
	idPersona: number;
	fechaReserva: Date;
	cantidadPersonas: number;
	tipoReserva: string;
	estado: string;
	observaciones: string;

    constructor(){
        this.idReserva = 0;
        this.idPersona = 0;
        this.fechaReserva = new Date();
        this.cantidadPersonas = 0;
        this.tipoReserva = '';
        this.estado = '';
        this.observaciones = '';
    }
}