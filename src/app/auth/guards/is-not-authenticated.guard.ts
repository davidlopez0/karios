import { inject } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
 
const checkAuthStatus = (): Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    map(resp => {
      if(resp == false) {
        router.navigate(['/auth/login']);
        return false;
      };

      return true;
    })
  )
};
 
//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivateGuardIsNot: CanActivateFn = (
  //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  
  return checkAuthStatus();
};