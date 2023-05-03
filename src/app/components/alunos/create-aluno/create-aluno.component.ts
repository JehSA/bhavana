import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlunoInterface } from 'src/app/models/alunos';
import { AlunosService } from 'src/app/services/alunos.service';

@Component({
  selector: 'app-create-aluno',
  templateUrl: './create-aluno.component.html',
  styleUrls: ['./create-aluno.component.scss']
})
export class CreateAlunoComponent implements OnInit {

  submitted = false;
  id: any;

  constructor(private aln: AlunosService, 
              private aRoute: ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.aln)    
  }

  public newPostForm = new FormGroup({
    email: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.esEditar();
  }

  newAluno(data: any) {
    this.aln.saveAluno(data);
  }

  editAluno(id: string, aluno: any) {
    this.aln.updateAluno(id, aluno)
    console.log(this.aln)
  }

  newEditAluno(aluno: any, id: any) {
    if(this.newPostForm.invalid){
      return;
    }
    if(this.id === null) {
      this.aln.saveAluno(aluno);
    }else{
      this.aln.updateAluno(id, aluno)
    }

  }

  esEditar() {
    if(this.id !== null) {
      this.aln.getAlunoById(this.id).subscribe(data => {
        console.log(data.payload.data()['email']);
        this.newPostForm.setValue({
          email: data.payload.data()['email'],
          nome: data.payload.data()['nome']
        });
      });
    }
  }

  newAndEditAluno() {
    //if(this.newPostForm.invalid){
    //  return;
    //}
    //if(this.id === null) {
    //  this.adicionarLivro();
    //}else{
    //  this.editarLivro(this.id);
    //}
  }

}
