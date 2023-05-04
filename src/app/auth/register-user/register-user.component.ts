import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';

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
      email: ['', Validators.required],
      password: ['', Validators.required],
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
      this.loading = false;
      this.openSnackBarSucess();
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.loading = false;
      this.openSnackBarFail(this.firebaseError.firebaseCodeErrors(error.code));
    })
  }

  openSnackBarFail(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackBarFail']
    });
  }

  openSnackBarSucess() {
    this._snackBar.open('Usuário cadastrado! Aguarge a liberação do administrador.', '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackBarSucess']
    });
  }

}
