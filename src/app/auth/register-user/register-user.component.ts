import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerUser: FormGroup;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {
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
    
    this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
    }).catch((error) => {
      console.log(error);
      alert(this.firebaseError(error.code));
    })
  }

  firebaseError(code: string) {
    switch(code) {
      case 'auth/email-already-in-use':
        return 'O usuário já existe!';
      case 'auth/weak-password':
        return 'A senha precisa ter ao menos 6 caracteres!';
      case 'auth/invalid-email':
        return 'Insira um e-mail válido!';   
      default:
        return 'Erro desconhecido!';
    }
  }

}
