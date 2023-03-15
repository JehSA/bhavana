import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData),
      err => reject(err)); 
    })
  }

  loginEmailPassword(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err))
    })
  }

  logoutUser() {
    return this.afAuth.signOut();
  }

}
