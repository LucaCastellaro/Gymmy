import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public exercises: any[] = [
    {
      id: '1',
      name: 'Esercizio 1',
      done: false
    },
    {
      id: '2',
      name: 'Esercizio 2',
      done: true
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
