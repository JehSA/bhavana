import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dataUser: any;

  mostraMenu = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  viewNavBar() {
    this.afAuth.currentUser.then(user => {
      if(user && user.emailVerified) {
        this.mostraMenu = true;
      } else {
        this.mostraMenu = false;
        //this.router.navigate(['/login']);
      }
    });
  }

}
