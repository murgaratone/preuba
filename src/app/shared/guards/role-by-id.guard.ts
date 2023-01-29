import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RoleByIdGuard implements CanActivate {
  constructor(public storageService: StorageService, private router: Router) {}

  get role() {
    return this.storageService.getValue('user')?.idProfile;
  }

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const roles: Array<string> = route.data['roles'];
    const fragment: string | null = route.data['fragment'];
    if (roles.includes(this.role)) {
      return true;
    } else {
      if (fragment) {
        this.router.navigate(['/inventory/'+fragment]);
      }
      else{
        this.router.navigate(['/']);
      }
      return false;
    }
  }
}
