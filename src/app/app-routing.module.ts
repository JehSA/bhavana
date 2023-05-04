import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './components/alunos/alunos.component';
import { HomeComponent } from './components/home/home.component';
import { ProfessoresComponent } from './components/professores/professores.component';
import { CreateAlunoComponent } from './components/alunos/create-aluno/create-aluno.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { MailVerifyComponent } from './auth/mail-verify/mail-verify.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'mail-verify', component: MailVerifyComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'professores', component: ProfessoresComponent },
  { path: 'create-aluno', component: CreateAlunoComponent },
  { path: 'edit-aluno/:id', component: CreateAlunoComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
