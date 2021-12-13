import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';
import { Pais } from 'src/app/model/pais';
import { PaisService } from 'src/app/service/pais.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-persona-modal',
  templateUrl: './persona-modal.component.html',
  styleUrls: ['./persona-modal.component.css']
})
export class PersonaModalComponent implements OnInit {

  persona : Persona;
  pais: Pais[];
  constructor(
    private dialogRef: MatDialogRef<PersonaModalComponent>,
    private paisService: PaisService,
    private personaService: PersonaService,
    @Inject(MAT_DIALOG_DATA) private data: Persona
    ) { 
    this.persona = new Persona();
    this.pais = [];
  }

  ngOnInit(): void {
    this.persona = new Persona();
    this.persona.idPersona = this.data.idPersona;
    this.persona.nombres = this.data.nombres;
    this.persona.apellidos = this.data.apellidos;
    this.persona.edad = this.data.edad;
    this.persona.pais = this.data.pais;

    this.paisService.listar().subscribe(data => {
      this.pais = data;
    })
  }

  aceptar(){
    if(this.persona != null && this.persona.idPersona > 0){
      this.personaService.editar(this.persona).subscribe(()=>{
        return this.personaService.listar().subscribe(data =>{
          this.personaService.personaActualizar.next(data);
        });
      });

    }else{
      this.personaService.registrar(this.persona).subscribe(()=>{
        this.personaService.listar().subscribe(data =>{
          this.personaService.personaActualizar.next(data);
        })
      });
    }
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }
}
