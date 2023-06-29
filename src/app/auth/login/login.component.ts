import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
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
    private firebaseError: FirebaseCodeErrorsService,
    private guard: AuthGuard
  ) {
    this.userLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.guard.menu.emit(false);
  }

  login() {
    const email = this.userLogin.value.email;
    const password = this.userLogin.value.password;
    
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if(user.user?.emailVerified) {
        this.router.navigate(['/home']);
        this.openSnackBarSucess()
      } else {
        this.router.navigate(['/mail-verify']);
      }      
    }).catch((error) => {
      this.loading = false;
      this.openSnackBarFail(this.firebaseError.firebaseCodeErrors(error.code));
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
    this._snackBar.open('Seja bem-vindo ' + this.userLogin.value.email, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackBarInfo']
    });
  }

}
