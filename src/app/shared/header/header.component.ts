import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mostraMenu: boolean = false;

  constructor(private router: Router, private afAuth: AngularFireAuth, private guard: AuthGuard) { 
  }

  logout() {
    //location.reload();
    this.afAuth.signOut()
      .then(() => location.reload())
      .then(() => this.router.navigate(['/login']))
      
  }

  ngOnInit(): void {
  }

  
  viewNavBar() {
    this.afAuth.currentUser.then(user => {
      if(user && user.emailVerified) {
        console.log(user.emailVerified)
        this.mostraMenu = true;
      } else {
        this.mostraMenu = false;
        this.router.navigate(['/login']);
      }
    });
  }
  

}
