import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: 'public.component.html',
  styleUrls: ['public.component.scss']
})
export class PublicComponent {

    constructor(
      ) { }

    ngOnInit() {
    }

}
