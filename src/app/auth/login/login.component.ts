import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: FormGroup;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth, 
    private _snackBar: MatSnackBar,
    private router: Router,
    private firebaseError: FirebaseCodeErrorsService
  ) {
    this.userLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.userLogin.value.email;
    const password = this.userLogin.value.password;
    
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.router.navigate(['/alunos'])
      this.openSnackBarSucess()
    }).catch((error) => {
      this.loading = false;
      this.openSnackBarFail(this.firebaseError.firebaseCodeErrors(error.code))
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

  openSnackBarSucess() {
    this._snackBar.open('Usuário logado!', '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackBarSucess']
    });
  }

}
