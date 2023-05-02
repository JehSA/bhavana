import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { AlunoInterface } from '../models/alunos';

@Injectable({
  providedIn: 'root'
})
export class AlunosService  {

  private alunosCollection: AngularFirestoreCollection<AlunoInterface>;
  private alunos: Observable<AlunoInterface[]>;

  constructor(private afs: AngularFirestore) {
    this.alunosCollection = afs.collection<AlunoInterface>('alunos', resp =>    
      resp.orderBy('nome', 'asc')
    );
    this.alunos = this.alunosCollection.valueChanges();    
  }


  getAllAlunos() {
    return this.alunos = this.alunosCollection.snapshotChanges()
    .pipe(map(changes => {      
      return changes.map( action => {        
        const data = action.payload.doc.data() as AlunoInterface;
        data.id = action.payload.doc.id;
        return data;
      });    
    }));
  }  

  addAluno() {

  }

  updateAluno() {

  }

  deleteAluno() {

  }

}
