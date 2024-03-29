import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  menu = new EventEmitter<boolean>();
  
  constructor(private afAuth: AngularFireAuth, private router: Router, private _snackBar: MatSnackBar) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
    const user = this.afAuth.currentUser;
    const isAuthenticated = await user ? true : false;
    if(!isAuthenticated) {
      this.menu.emit(false);
      this.router.navigate(['/login']);      
      this.openSnackBar();
    }
    this.menu.emit(true);
    return isAuthenticated;
  }

  openSnackBar() {
    this._snackBar.open('Você precisa estar logado para acessar este conteúdo.', '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackBarFail']
    });
  }
  
}
