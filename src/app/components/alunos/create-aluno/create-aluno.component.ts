import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  test: any[] = [];

  selectUnidade: any;

  ufSelect!: any[];
  selectedValue: any;
  
  masks: any;

  diagnosticos = ['Depressão', 'Diabetes', 'Enxaqueca', 'Hipertensão', 'Insônia', 'Labirintite'];

  constructor(
    private aln: AlunosService, 
    private aRoute: ActivatedRoute, 
    private _snackBar: MatSnackBar, 
    private planoServ: PlanosService,
    private _fb: FormBuilder
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
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
    diagnosticos: this.buildDiagnosticos(),
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
        this.newPostForm.patchValue({
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
    .subscribe((planos: PlanoInterface[] | undefined) => {
      this.dataSource = new MatTableDataSource<PlanoInterface>(planos);
      this.selectUnidade = this.dataSource.filteredData;
    });    
  }

  /* As duas funções que seguem são responsáveis pelo funcionamento do array de diagnósticos no formulário */
  buildDiagnosticos() {
    const values = this.diagnosticos.map(v => new FormControl(false));
    return this._fb.array(values);
  }
  getDiagnosticosControls() {
    return this.newPostForm.get('diagnosticos') ? (<FormArray>this.newPostForm.get('diagnosticos')).controls : null;
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
