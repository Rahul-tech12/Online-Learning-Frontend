import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private baseUrl="${environment.apiUrl}/courses";

  constructor(private http:HttpClient){}

  getAllCourses(){
    return this.http.get<any[]>(`${environment.apiUrl}`);
  }

  enrollCourse(courseId:number){
    return this.http.post(`${environment.apiUrl}/enrollments/${courseId}`,{},{responseType:'text'});
  }

  getMyCourses(){
    const token=localStorage.getItem('token');
    return this.http.get<any[]>(`${environment.apiUrl}/enrollments/my-courses`,{headers:{Authorization:`Bearer ${token}`}});
  }

  updateProfile(UserInfo:any[]){
    return this.http.put(`${environment.apiUrl}/user-profile`,UserInfo)
  }

  getProfile(){
    const token=localStorage.getItem('token');
    return this.http.get<any>(`${environment.apiUrl}/user-profile`,{headers:{Authorization: `Bearer ${token}`}})
  }

}
