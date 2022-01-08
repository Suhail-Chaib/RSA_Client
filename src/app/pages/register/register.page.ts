import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ValidationService } from '../../services/validation.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      validator: ValidationService.MatchPassword // Inject the provider method
    });
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.registerForm.controls; }

  submitRegister() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    const password = this.registerForm.value.password;
    let user = {'password': password};

    this.userService.registerUser(user)
          .pipe(first())
          .subscribe(() => {
                  this.router.navigate(['/log-in']);
              }/*,
              error => {
                this.alertService.error(error);
                this.presentAlert(error.error.message);    
              }*/);
  }

}
