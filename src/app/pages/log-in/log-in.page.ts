import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  
  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],});
  }

  get formControls() { return this.loginForm.controls; }

  submitLogin(): void {

    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }

    const password = this.loginForm.value.password;
    
    localStorage.setItem('password', password);
    //console.log(password);

    this.userService.loginUser(password)
      .pipe(first())
      .subscribe(() =>  {        
            this.router.navigateByUrl('/home');
            //this.router.navigateByUrl('/admin-desk/'+ this.formControls.name.value);
          }//,
          //error => {
              //console.log(error);}
          );
  }

}
