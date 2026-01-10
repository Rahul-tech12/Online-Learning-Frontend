import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminCourseService } from '../admin-course-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  imports: [ReactiveFormsModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm {

  courseForm=new FormGroup({
    title:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    duration:new FormControl('',[Validators.required]),
    price:new FormControl(0,[Validators.required]),
    published:new FormControl(false,[Validators.required])
  });

  selectedFile!:File;
  courseId?:number;

  constructor(private courseService:AdminCourseService, private route:ActivatedRoute, private router:Router){}

  ngOnInit(){
    this.courseId=Number(this.route.snapshot.paramMap.get('id'));
  }

  onFileChange(event:any){
    this.selectedFile=event.target.files[0];
  }

  submit(){
    if(this.courseForm.invalid) return;
    if(this.courseId){
      this.courseService.updateCourse(this.courseId,this.courseForm.value,this.selectedFile).subscribe(()=>{
        this.router.navigate(['/admin']);
      })
    }else{
      this.courseService.createCourse(this.courseForm.value,this.selectedFile).subscribe(()=>{
        console.log("course created");
        this.router.navigate(['/admin']);
      })
    }
  }
}
