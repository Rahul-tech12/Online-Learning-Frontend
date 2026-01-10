import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {


  @Input() user:any;
  @Output() close=new EventEmitter<void>();
  @Output() updated=new EventEmitter<void>();

  constructor(private userService:UserService){}

  ngOnChanges(){
    console.log(this.user);
  }
  save(){
    this.userService.updateProfile(this.user).subscribe(()=>{
      alert('Profile updated successfully');
      this.updated.emit();
      this.close.emit();
    });
  }

}