import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {

    constructor(
      private router: Router
    ) { }

    ngOnInit() {
    }

    onClick(){
      this.router.navigate(['/login']);
    }
}
