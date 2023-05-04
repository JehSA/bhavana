import { Injectable } from '@angular/core';
import { FirebaseCodeErrorsEnum } from '../utils/firebase-code-errors';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorsService {

  constructor() { }

  firebaseCodeErrors(code: string) {
    switch(code) {
      case FirebaseCodeErrorsEnum.EmailAlreadyInUse:
        return 'O usuário já existe!';
      case FirebaseCodeErrorsEnum.WeakPassword:
        return 'A senha precisa ter ao menos 6 caracteres!';
      case FirebaseCodeErrorsEnum.InvalidEmail:
        return 'Insira um e-mail válido!';
      case FirebaseCodeErrorsEnum.WrongPassword:
        return 'A senha está incorreta!';
      case FirebaseCodeErrorsEnum.UserNotFound:
        return 'Usuário não encontrado!'   
      default:
        return 'Erro desconhecido!';
    }
  }

}
