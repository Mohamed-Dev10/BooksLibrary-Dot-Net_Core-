import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 


constructor(private router: Router,private authService: AuthService){

}

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean {
  //alert('AuthGuard canActivate called');
  if (this.authService.isAuthenticated()) {
   // alert('is   authenticated');
    return true;
  } else {
    //alert('User is not authenticated, redirecting to login');
    this.router.navigate(['/login']);
    return false;
  }
}

  
}
