export class Person {
    idPersona: number;
    tipoDocumento: string;
    identificacion: string;
    nombre: string;
    apellido: string;
    email: string;
    idRol: number;
    estado: string;

    constructor(){
        this.idPersona = 0;
        this.tipoDocumento = '';
        this.identificacion = '';
        this.nombre = '';
        this.apellido = '';
        this.email = '';
        this.idRol = 0;
        this.estado = '';
    }
}