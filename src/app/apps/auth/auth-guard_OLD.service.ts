import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  usrDtls: any;

  constructor(public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        this.usrDtls = JSON.parse(localStorage.getItem('userdata'));
        if (this.usrDtls && this.usrDtls.usr_id) {
          return true;
        }
        else {
          this.router.navigate(['/internal']);
          return false;
        }
  }
}