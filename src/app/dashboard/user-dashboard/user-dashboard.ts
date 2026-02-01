import { Component } from '@angular/core';
import { UserService } from '../user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../user-profile/user-profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule,FormsModule,UserProfile],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {

  courses:any[]=[];
  filteredCourses:any[]=[];
  enrolledCourseIds=new Set<number>();

  viewMode:'ALL' | 'MY'='ALL';
  searchText=''
  minPrice=0;
  maxPrice=10000;
  selectedDuration='';

  showProfileMenu=false;
  showProfilePage=false;
  currentUser:any=null;

  constructor(private UserService:UserService, private router:Router){}
  
  ngOnInit(){
    this.loadCourses();
    this.loadMyCourses();
    this.loadCurrentUser();
  }


  loadCourses(){
    this.viewMode='ALL';
    this.UserService.getAllCourses().subscribe(res=>{
      this.courses=res;
      this.applyFilters();
    })
  }

  loadMyCourses(){
    this.UserService.getMyCourses().subscribe({
      next:res=>{
        console.log(res);
        this.enrolledCourseIds=new Set(
          res.map(c=>c.course_id)
        );
        
      },
      error:err=>console.log(err)
    }
    )
  }

  loadCurrentUser(){
    this.UserService.getProfile().subscribe(res=>{
      console.log(res);
      this.currentUser=res;
    })
  }

  toggleProfileMenu(){
    this.showProfileMenu=!this.showProfileMenu;
  }
  openProfile(){
    this.showProfilePage=true;
    this.showProfileMenu=false;
  }
  closeProfile(){
    this.showProfilePage=false;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  showMyCourses(){
    this.viewMode='MY';
    this.UserService.getMyCourses().subscribe(res=>{
      this.filteredCourses=res;
      console.log(res);
    })
  }

  minDuration=0;
  maxDuration=Infinity;
  applyFilters(){
     if(this.viewMode==='MY') return;
     if(this.selectedDuration){
      const parts=this.selectedDuration.split('-');
      this.minDuration=Number(parts[0]);
      this.maxDuration=Number(parts[1]?? Infinity);
     }else{
      this.minDuration=0;
      this.maxDuration=Infinity;
     }

    this.filteredCourses=this.courses.filter(c=>
      c.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      c.price>=this.minPrice && c.price<this.maxPrice &&
      c.duration<=this.maxDuration && c.duration>=this.minDuration
    );
  }

  enroll(courseId:number){
    this.UserService.enrollCourse(courseId).subscribe({
      //toast notfication
      next:()=>{
        this.enrolledCourseIds.add(courseId);
      },
      error:err=>alert('Error while enrolling the course' + (err.error ?? ''))
    }
    )
  }

  isEnrolled(courseId:number):boolean{
    return this.enrolledCourseIds.has(courseId);
  }

}
