import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  

  constructor(private http:HttpClient){}

  getAllCourses(){
    return this.http.get<any[]>(`${environment.apiUrl}/courses`);
  }

  enrollCourse(courseId:number){
    console.log(courseId);
    return this.http.post(`${environment.apiUrl}/enrollments/${courseId}`,{},{responseType:'text' as 'json'});
  }

  getMyCourses(){
    return this.http.get<any[]>(`${environment.apiUrl}/enrollments/my-courses`);
  }

  updateProfile(UserInfo:any[]){
    return this.http.put(`${environment.apiUrl}/user-profile`,UserInfo)
  }

  getProfile(){
    const token=localStorage.getItem('token');
    return this.http.get<any>(`${environment.apiUrl}/user-profile`)
  }

}
