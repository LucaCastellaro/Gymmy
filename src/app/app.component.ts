import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from './shared/constants/routes.constants';
import { LocalStorageService } from './shared/services/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public title: string = 'Gymmy';

  constructor(
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
  ){}

  ngOnInit(): void {
    const route: string = this.localStorageService.isLoggedIn() 
      ? RoutesConstants.Dashboard 
      : RoutesConstants.Auth;
    this.router.navigate([route]);
  }

}
