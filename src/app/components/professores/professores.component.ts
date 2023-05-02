import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresComponent implements OnInit {

  rows: any;
  columns: any;

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.getProfessores();
  }

  getProfessores() {
    this.afs.collection('alunos').valueChanges().subscribe(alunos => {
      this.rows = alunos;
      this.columns = [
        {name: 'id'},
        {name: 'nome'},
        {name: 'email'}
      ]
    })
  }

}
