import { Component, OnInit } from '@angular/core';
import { AlunosService } from 'src/app/services/alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

  constructor(private alunoService: AlunosService) { }

  public alunos = [];
  public aluno = ''; 

  ngOnInit(): void {
    this.alunoService.getAllAlunos().subscribe(alunos => {
      console.log('', alunos);
    })
  }

}
