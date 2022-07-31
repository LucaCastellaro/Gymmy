import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from './shared/constants/routes.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public title: string = 'Gymmy';

  constructor(
    private readonly router: Router
  ){}

  ngOnInit(): void {
    this.router.navigate([RoutesConstants.Auth]);
  }

}
