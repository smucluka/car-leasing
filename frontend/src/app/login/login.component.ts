import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
      this.loginForm  =  this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });

      // reset login status
      this.authenticationService.logout();

    }

    get formControls() { return this.loginForm.controls; }

    onSubmit() {
      this.isSubmitted = true;
      if (this.loginForm.invalid) {
        return;
      }
      this.authenticationService.login(this.formControls.email.value, this.formControls.password.value).pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/admin']);
        }
      );

    }
}
