import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Persona } from '../model/persona';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaActualizar = new Subject<Persona[]>();

  private url: string = 'http://localhost:8090/personas';

  constructor(private Http: HttpClient) { }

  listar(){
    return this.Http.get<Persona[]>(this.url);
  }

  eliminar(id: number){
    return this.Http.delete(`${this.url}/${id}`);
  }

  editar(persona: Persona){
    return this.Http.put(this.url, persona);
  }
  
  registrar(persona: Persona){
    return this.Http.post(this.url, persona);
  }
}
