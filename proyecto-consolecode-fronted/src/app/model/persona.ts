import { Pais } from "./pais"

export class Persona{
    idPersona: number;
    nombres: String;
    apellidos: String;
    edad: number;
    pais: Pais;

    constructor() {
        this.apellidos = "";
        this.idPersona = 0;
        this.nombres = "";
        this.edad = 0;
        this.pais = new Pais();
       }
}