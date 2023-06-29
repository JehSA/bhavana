import { Injectable } from '@angular/core';
import { ProfessorInterface } from '../models/professores';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessoresService {

  private professoresCollection: AngularFirestoreCollection<ProfessorInterface>;
  private professores: Observable<ProfessorInterface[]>;

  constructor(private afs: AngularFirestore) { 
    this.professoresCollection = afs.collection<ProfessorInterface>('professores', resp =>    
      resp.orderBy('nome', 'asc')
    );
    this.professores = this.professoresCollection.valueChanges(); 
  }

  getAllProfessores() {
    return this.professores = this.professoresCollection.snapshotChanges()
    .pipe(map(changes => {      
      return changes.map(action => {        
        const data = action.payload.doc.data() as ProfessorInterface;
        data.id = action.payload.doc.id;
        return data;
      });    
    }));
  }

  getProfessorById(id: string): Observable<any> {
    return this.afs.collection('professores').doc(id).snapshotChanges();
  }

  saveProfessor(professor: any): Promise<any> {
    return this.afs.collection('professores').add(professor);
  }

  updateProfessor(id: string, professor: any): Promise<any> {
    return this.afs.collection('professores').doc(id).update(professor);
  }

  deleteProfessor(id: string): Promise<any> {
    return this.afs.collection('professores').doc(id).delete();
  }

}
