import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);
  console.log(authService.getRole());
  if(authService.getRole()!=="ADMIN"){
    router.navigate(["/user-dashboard"]);
    return false;
  }
  return true;
};
