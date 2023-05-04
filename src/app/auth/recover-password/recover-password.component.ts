import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  
  userRecover: FormGroup;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth, 
    private _snackBar: MatSnackBar,
    private router: Router,
    private firebaseError: FirebaseCodeErrorsService
  ) { 
    this.userRecover = this.fb.group({
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  recover() {
    const email = this.userRecover.value.email;

    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.openSnackBarInfo()
      this.router.navigate(['/login']);
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

  openSnackBarInfo() {
    this._snackBar.open('Confira seu email. Enviamos um link para o cadastro de nova senha.', '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackBarInfo']
    });
  }

}
