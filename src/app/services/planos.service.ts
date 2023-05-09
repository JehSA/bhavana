import { Injectable } from '@angular/core';
import { PlanoInterface } from '../models/planos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanosService {

  private planosCollection: AngularFirestoreCollection<PlanoInterface>;
  private planos: Observable<PlanoInterface[]>;

  constructor(private afs: AngularFirestore) { 
    this.planosCollection = afs.collection<PlanoInterface>('planos', resp =>    
      resp.orderBy('unidade', 'asc')
    );
    this.planos = this.planosCollection.valueChanges(); 
  }

  getAllPlanos() {
    return this.planos = this.planosCollection.snapshotChanges()
    .pipe(map(changes => {      
      return changes.map(action => {        
        const data = action.payload.doc.data() as PlanoInterface;
        data.id = action.payload.doc.id;
        return data;
      });    
    }));
  }

  getPlanoById(id: string): Observable<any> {
    return this.afs.collection('planos').doc(id).snapshotChanges();
  }

  savePlano(plano: any): Promise<any> {
    return this.afs.collection('planos').add(plano);
  }

  updatePlano(id: string, plano: any): Promise<any> {
    return this.afs.collection('planos').doc(id).update(plano);
  }

  deletePlano(id: string): Promise<any> {
    return this.afs.collection('planos').doc(id).delete();
  }

}
