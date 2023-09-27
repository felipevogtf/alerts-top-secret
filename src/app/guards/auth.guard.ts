import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const token = await this.authService.isLogged();

    if (token) {
      this.authService.setLoginState(true);
      if (state.url === '/login') {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } else {
      this.authService.setLoginState(false);
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const authGuardCheck: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(AuthGuard).canActivate(next, state);
};
