import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';
import { initializeApp } from "firebase-admin/app";
import * as admin from 'firebase-admin';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerUser: FormGroup;

  loading: boolean = false;  

  constructor(
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth, 
    private _snackBar: MatSnackBar,
    private router: Router,
    private firebaseError: FirebaseCodeErrorsService
  ) {
    this.registerUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  newUser() {
    const email =this.registerUser.value.email;
    const password =this.registerUser.value.password;
    const confirmPassword =this.registerUser.value.confirmPassword;

    if(password != confirmPassword) {
      this.openSnackBarFail('As senhas inseridas devem ser idênticas!');
      return;
    }
    
    this.loading = true;
    this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.verifyUser();
    }).catch((error) => {
      this.loading = false;
      this.openSnackBarFail(this.firebaseError.firebaseCodeErrors(error.code));
    })
  }

  verifyUser() {
    this.afAuth.currentUser.then(user => user?.sendEmailVerification())    
      .then(() => {        
        this.loading = false;
        this.openSnackBarInfo();
        this.router.navigate(['/login']);
      });
  }

  openSnackBarFail(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackBarFail']
    });
  }

  openSnackBarInfo() {
    this._snackBar.open('Usuário cadastrado! Verifique o seu email.', '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackBarInfo']
    });
  }

}
