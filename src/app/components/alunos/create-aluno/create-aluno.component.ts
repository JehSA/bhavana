import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PlanoInterface } from 'src/app/models/planos';
import { AlunosService } from 'src/app/services/alunos.service';
import { PlanosService } from 'src/app/services/planos.service';

@Component({
  selector: 'app-create-aluno',
  templateUrl: './create-aluno.component.html',
  styleUrls: ['./create-aluno.component.scss']
})
export class CreateAlunoComponent implements OnInit {

  id: any;

  selectUnidade: any;

  dataSource!: MatTableDataSource<PlanoInterface>;

  ufSelect!: any[];
  selectedValue: any;
  masks: any;

  constructor(
    private aln: AlunosService, 
    private aRoute: ActivatedRoute, 
    private _snackBar: MatSnackBar, 
    private planoServ: PlanosService
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');   
  }

  public newPostForm = new FormGroup({
    unidade: new FormControl('', Validators.required),
    status: new FormControl(''),
    plano: new FormControl(''),    
    dtMatricula: new FormControl(''),
    nome: new FormControl('', [Validators.required]),    
    dtNascimento: new FormControl(''),    
    sexo: new FormControl(''),   
    rg: new FormControl(''),   
    cpf: new FormControl(''),  
    endereco: new FormControl(''),
    cep: new FormControl(''), 
    bairro: new FormControl(''),
    cidade: new FormControl(''),
    uf: new FormControl(''),   
    email: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl(''),
    telefone: new FormControl(''),
    obs: new FormControl('')  
  });

  ngOnInit(): void {
    this.getPlanoForSelect();
    this.esEditar();    
  }

  newAluno(data: any) {
    this.aln.saveAluno(data);
    this.newPostForm.reset();
    this.openSnackBar('Aluno cadastrado com sucesso!');
  }

  editAluno(id: string, aluno: any) {
    this.aln.updateAluno(id, aluno);
    this.openSnackBar('Os dados do aluno foram alterados com sucesso!');
  }

  newEditAluno(aluno: any, id: any) {
    if(this.newPostForm.invalid){
      return;
    }
    if(this.id === null) {
      this.aln.saveAluno(aluno);
    }else{
      this.aln.updateAluno(id, aluno);
    }
  }

  esEditar() {
    if(this.id !== null) {
      this.aln.getAlunoById(this.id).subscribe(data => {
        this.newPostForm.setValue({
          unidade: data.payload.data()['unidade'],
          status: data.payload.data()['status'],          
          plano: data.payload.data()['plano'],
          dtMatricula: data.payload.data()['dtMatricula'],
          nome: data.payload.data()['nome'],
          dtNascimento: data.payload.data()['dtNascimento'],          
          sexo: data.payload.data()['sexo'],
          rg: data.payload.data()['rg'],
          cpf: data.payload.data()['cpf'],
          endereco: data.payload.data()['endereco'],
          cep: data.payload.data()['cep'],
          bairro: data.payload.data()['bairro'],
          cidade: data.payload.data()['cidade'],
          uf: data.payload.data()['uf'],
          email: data.payload.data()['email'],
          celular: data.payload.data()['celular'],
          telefone: data.payload.data()['telefone'],
          obs: data.payload.data()['obs']          
        });
      });
    }
  }
 
  getPlanoForSelect() {
    this.selectUnidade = this.planoServ.getAllPlanos()
    .subscribe(planos => {
      this.dataSource = new MatTableDataSource<PlanoInterface>(planos);
      this.selectUnidade = this.dataSource.filteredData;
    });    
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
