import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RoutesConstants } from '../constants/routes.constants';
import { LocalStorageService } from '../services/localStorage.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly localStorageService: LocalStorageService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(route.url[0].path === RoutesConstants.Auth) 
            return !this.localStorageService.isLoggedIn();
        else 
            return this.localStorageService.isLoggedIn();
    }
}