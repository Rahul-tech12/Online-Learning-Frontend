import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.html',
  styleUrls: ['../auth.css'],
})
export class Login {

  apiError: string | null='';
  userForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])
  })

  constructor( private router:Router){}
   authService=inject(AuthService);
  login(){
    if(this.userForm.invalid) return;
    this.apiError=null;
    this.authService.login(this.userForm.value).subscribe({
      next:(res)=>{this.authService.saveToken(res);
        const payload=JSON.parse(atob(res.split('.')[1]));
        const userRole=payload.role;
        console.log(userRole);
        if(userRole.toString() == 'ROLE_ADMIN'){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/user-dashboard']);
        }
      },
      error:err=>{
        this.apiError=err.error?.message || 'Invalid credentials'
      }
    });
  }
}
