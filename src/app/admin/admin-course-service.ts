import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminCourseService {


  constructor(private http:HttpClient){}

  getAllCourses(){
    return this.http.get<any[]>(`${environment.apiUrl}`);
  }
  
  createCourse(data:any,image:File){
    const formData=new FormData();
    formData.append(
      'data',new Blob([JSON.stringify(data)],{type:'application/json'})
    );
    formData.append('file',image);
    return this.http.post(`${environment.apiUrl}`,formData);
  }

  updateCourse(id:number,data:any,image?:File){
    const formData=new FormData();
    formData.append(
      'data',new Blob([JSON.stringify(data)],{type:'application/json'})
    );
    if(image){
      formData.append('file',image);
    }
    return this.http.put(`${environment.apiUrl}/${id}`,formData);
  }

  deleteCourse(id:number){
    return this.http.delete(`${environment.apiUrl}/${id}`,{responseType:'text' as 'json'});
  }

  getCoursesWithEnrollment(){
    return this.http.get<any[]>(`${environment.apiUrl}/admin/enrollments`)
  }
}
