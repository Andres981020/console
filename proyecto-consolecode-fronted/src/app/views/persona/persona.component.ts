import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PersonaModalComponent } from './persona-modal/persona-modal.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns = ['idPersona', 'nombres', 'apellidos', 'edad','pais','editar-eliminar'];
  dataSource: MatTableDataSource<Persona>;


  constructor(private personaService: PersonaService, private dialog: MatDialog) {
    //this.persona = [];
    this.dataSource = new MatTableDataSource;
   }

  ngOnInit(): void {

    this.personaService.personaActualizar.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
    });
    //this.personaService.listar().subscribe(data => this.persona = data);
    this.personaService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
    });
  }

  openModal(persona?:Persona){
    let person = persona != null ? persona: new Persona();
    this.dialog.open(PersonaModalComponent,{
      width:'260px',
      data: person
    })
  }

  onDelete(id: number){
    
    this.personaService.eliminar(id).subscribe(()=>{
      this.personaService.listar().subscribe(data=>{
        this.dataSource = new MatTableDataSource(data);
      })
    });
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }
}
