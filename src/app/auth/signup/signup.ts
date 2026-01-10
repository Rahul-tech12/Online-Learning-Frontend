import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordMatch } from '../../shared/validators/password-match';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['../auth.css'],
})
export class Signup {
  apiError: string | null='';
  userForm=new FormGroup({
    username:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/)]),
    confirmPassword:new FormControl('',[Validators.required,Validators.minLength(8)])
  },{validators:PasswordMatch});

  constructor(private router:Router){}
  authService=inject(AuthService);
  signUp(){
    if(this.userForm.invalid) return;
    this.apiError=null;
    this.authService.signup(this.userForm.value).subscribe({
      next:()=>{
        this.router.navigate(["/login"]);
      },
      error:err=>{
        this.apiError=err.error?.message || 'Something went wrong!';
      }
    });
  }
}
