import { Component } from '@angular/core';
import { AdminCourseService } from '../admin-course-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink,CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  courses:any[] | null=[];
  enrollmentPerCourse:any[] | null=[];

  constructor(private courseService:AdminCourseService){}

  ngOnInit(){
    this.showCourseList();
  }
  showCourseList(){
    this.enrollmentPerCourse=null;
    this.courseService.getAllCourses().subscribe(res=>{
      this.courses=res;
    }
  );
  }
  getEnrollmentsPerCourse(){
    this.courses=null;
    this.courseService.getCoursesWithEnrollment().subscribe(res=>{
      console.log(res);
      this.enrollmentPerCourse=res;
    })
  }

  deleteCourse(id:number){
    this.courseService.deleteCourse(id).subscribe(()=>{
      this.showCourseList();
    })
  }
}
