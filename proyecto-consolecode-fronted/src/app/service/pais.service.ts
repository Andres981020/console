import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../model/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private url: string = 'http://localhost:8090/pais';

  constructor(private Http: HttpClient) { }

  listar(){
    return this.Http.get<Pais[]>(this.url);
  }
/*
  eliminar(id: number){
    return this.Http.delete(`${this.url}/${id}`)
  }

  editar(persona: Pais){
    return this.Http.put(this.url, persona);
  }*/
}
