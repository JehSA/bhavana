// Angular Material components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { TextMaskModule } from 'angular2-text-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Components from App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AlunosComponent } from './components/alunos/alunos.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProfessoresComponent } from './components/professores/professores.component';
import { CreateAlunoComponent } from './components/alunos/create-aluno/create-aluno.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { MailVerifyComponent } from './auth/mail-verify/mail-verify.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AuthGuard } from './guards/auth.guard';
import { PlanosComponent } from './components/planos/planos.component';
import { CreatePlanoComponent } from './components/planos/create-plano/create-plano.component';
import { CreateProfessorComponent } from './components/professores/create-professor/create-professor.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlunosComponent,
    HeaderComponent,
    ProfessoresComponent,
    CreateAlunoComponent,
    LoginComponent,
    RegisterUserComponent,
    MailVerifyComponent,
    RecoverPasswordComponent,
    SpinnerComponent,
    PlanosComponent,
    CreatePlanoComponent,
    CreateProfessorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    TextMaskModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot(),
    MatRadioModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule
  ],
  providers: [AngularFireAuth, AngularFirestore, AuthGuard, MatDatepickerModule],
  bootstrap: [AppComponent]
})

export class AppModule { }