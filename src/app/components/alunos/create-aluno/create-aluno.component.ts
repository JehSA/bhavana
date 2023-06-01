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

  dataSource!: MatTableDataSource<PlanoInterface>;

  id: any;

  selectUnidade: any;

  ufSelect!: any[];
  selectedValue: any;
  
  masks: any;

  masterSelected: boolean;
  checkedList: any;
  diagnosticosList: any = [
    {id: 1, isSelected: false, value: 'Depressão'},
    {id: 2, isSelected: false, value: 'Diabetes'},
    {id: 3, isSelected: false, value: 'Enxaqueca'},
    {id: 4, isSelected: false, value: 'Hipertensão'},
    {id: 5, isSelected: false, value: 'Insônia'},
    {id: 6, isSelected: false, value: 'Labirintite'}
  ];

  constructor(
    private aln: AlunosService, 
    private aRoute: ActivatedRoute, 
    private _snackBar: MatSnackBar, 
    private planoServ: PlanosService
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.masterSelected = false;
    this.diagnosticosList;
    this.getCheckedItemList(); 
  }

  public newPostForm = new FormGroup({
    unidade: new FormControl(''),
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
    obs: new FormControl(''),
    cirurgia: new FormControl(''),
    cirurgiaDetail: new FormControl(''),
    ortopedico: new FormControl(''),
    ortopedicoDetail: new FormControl(''),
    diagnosticos: new FormControl(''),
    outrasObsSaude: new FormControl(''),
    outrosHorarios: new FormControl(''),
    outrasAtividades: new FormControl(''),
    razaoEspaco: new FormControl(''),
    comoConheceu: new FormControl('')     
  });

  ngOnInit(): void {
    this.getPlanoForSelect();
    this.esEditar();    
  }

  newAluno(data: any) { 
    this.newPostForm.value.diagnosticos = this.checkedList;
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
          obs: data.payload.data()['obs'],
          cirurgia: data.payload.data()['cirurgia'],
          cirurgiaDetail: data.payload.data()['cirurgiaDetail'],
          ortopedico: data.payload.data()['ortopedico'],
          ortopedicoDetail: data.payload.data()['ortopedicoDetail'],
          diagnosticos: data.payload.data()['diagnosticos'],
          outrasObsSaude: data.payload.data()['outrasObsSaude'],
          outrosHorarios: data.payload.data()['outrosHorarios'],
          outrasAtividades: data.payload.data()['outrasAtividades'],        
          razaoEspaco: data.payload.data()['razaoEspaco'],
          comoConheceu: data.payload.data()['comoConheceu']     
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

  /*
  As próximas 2 funções insere os itens do checkbox em um array array e faz a 
  verificação se um item foi selecionado ou não, respectivamente.
  */
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.diagnosticosList.length; i++) {
      if(this.diagnosticosList[i].isSelected)
      this.checkedList.push(this.diagnosticosList[i].value);
    }
    this.checkedList = JSON.stringify(this.checkedList);
    console.log(this.checkedList, "!!!!!!!!!!!!!!")                        
  }
  isAllSelected() {
    this.masterSelected = this.diagnosticosList.every(function(item:any) {
      return item.isSelected === true;
    });
    this.getCheckedItemList();
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
