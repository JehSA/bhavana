import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PlanoInterface } from 'src/app/models/planos';
import { ProfessoresService } from 'src/app/services/professores.service';

@Component({
  selector: 'app-create-professor',
  templateUrl: './create-professor.component.html',
  styleUrls: ['./create-professor.component.scss']
})
export class CreateProfessorComponent implements OnInit {  

  dataSource!: MatTableDataSource<PlanoInterface>;

  id: any;

  selectUnidade: any;

  constructor(
    private pfs: ProfessoresService, 
    private aRoute: ActivatedRoute, 
    private _snackBar: MatSnackBar
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  public newPostForm = new FormGroup({
    nome: new FormControl(''),
    celular: new FormControl(''),
    email: new FormControl(''),
    unidade: new FormControl(''),
    status: new FormControl(''),
    obs: new FormControl('')    
  });  

  ngOnInit(): void {
    this.esEditar();    
  }

  newProfessor(data: any) { 
    this.pfs.saveProfessor(data);
    this.newPostForm.reset();
    this.openSnackBar('Aluno cadastrado com sucesso!');
  }

  editProfessor(id: string, plano: any) {
    this.pfs.updateProfessor(id, plano);
    this.openSnackBar('Os dados do aluno foram alterados com sucesso!');
  }

  newEditPlano(professor: any, id: any) {
    if(this.newPostForm.invalid){
      return;
    }
    if(this.id === null) {
      this.pfs.saveProfessor(professor);
    }else{
      this.pfs.updateProfessor(id, professor);
    }
  }
  
  esEditar() {    
    if(this.id !== null) {
      this.pfs.getProfessorById(this.id).subscribe(data => {
        this.newPostForm.patchValue({
          nome: data.payload.data()['nome'],
          celular: data.payload.data()['celular'],
          email: data.payload.data()['email'],
          unidade: data.payload.data()['unidade'],
          status: data.payload.data()['status'],          
          obs: data.payload.data()['obs']     
        });
      });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackBarSucess']
    });
  }

}
