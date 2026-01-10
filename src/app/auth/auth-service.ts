import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

  constructor(private http:HttpClient){}

  signup(data:any){
    return this.http.post("http://localhost:8080/auth/register",data,{responseType: 'text' as 'json'}); // Adjusted to expect text response
  }
  login(data:any){
    return this.http.post<any>(`${environment.apiUrl}/login`,data,{responseType:'text' as 'json'});
  }
  saveToken(token:string){
    localStorage.setItem('token',token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn():boolean{
    return !!this.getToken();
  }
  getRole():string | null{
    const token=this.getToken();
    console.log(token);
    if(!token)return null;
    const payload=JSON.parse(atob(token.split('.')[1]));
    console.log(payload.role)
    return payload.role || null;
  }
}
