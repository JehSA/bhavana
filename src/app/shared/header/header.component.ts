import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase-admin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dataUser: any;

  mostraMenu: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth) { 
    this.mostraMenu = false;
  }

  ngOnInit(): void {
    this.viewNavBar();
  }

  viewNavBar() {
    this.afAuth.currentUser.then(user => {
      if(user && user.emailVerified) {
        console.log(user.emailVerified)
        this.mostraMenu = true;
      } else {
        this.mostraMenu = false;
        //this.router.navigate(['/login']);
      }
    });
  }

}
