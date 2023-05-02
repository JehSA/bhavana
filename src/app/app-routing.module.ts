import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './components/alunos/alunos.component';
import { HomeComponent } from './components/home/home.component';
import { ProfessoresComponent } from './components/professores/professores.component';
import { LoginComponent } from './users/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { RegisterComponent } from './users/register/register.component';
import { CreateAlunoComponent } from './components/alunos/create-aluno/create-aluno.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'professores', component: ProfessoresComponent },
  { path: 'create-aluno', component: CreateAlunoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
