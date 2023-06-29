import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PlanoInterface } from 'src/app/models/planos';
import { PlanosService } from 'src/app/services/planos.service';

@Component({
  selector: 'app-create-plano',
  templateUrl: './create-plano.component.html',
  styleUrls: ['./create-plano.component.scss']
})
export class CreatePlanoComponent implements OnInit {  

  dataSource!: MatTableDataSource<PlanoInterface>;

  id: any;

  selectUnidade: any;

  constructor(
    private pln: PlanosService, 
    private aRoute: ActivatedRoute, 
    private _snackBar: MatSnackBar
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  public newPostForm = new FormGroup({
    unidade: new FormControl(''),
    descricao: new FormControl(''),
    valor: new FormControl('')    
  });  

  ngOnInit(): void {
    this.esEditar();    
  }

  newPlano(data: any) { 
    this.pln.savePlano(data);
    this.newPostForm.reset();
    this.openSnackBar('Aluno cadastrado com sucesso!');
  }

  editPlano(id: string, plano: any) {
    this.pln.updatePlano(id, plano);
    this.openSnackBar('Os dados do aluno foram alterados com sucesso!');
  }

  newEditPlano(plano: any, id: any) {
    if(this.newPostForm.invalid){
      return;
    }
    if(this.id === null) {
      this.pln.savePlano(plano);
    }else{
      this.pln.updatePlano(id, plano);
    }
  }
  
  esEditar() {    
    if(this.id !== null) {
      this.pln.getPlanoById(this.id).subscribe(data => {
        this.newPostForm.patchValue({
          unidade: data.payload.data()['unidade'],
          descricao: data.payload.data()['descricao'],          
          valor: data.payload.data()['valor']     
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
