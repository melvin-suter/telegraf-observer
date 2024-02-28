import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = '/api';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient, private router:Router) {

  }


  login(username: string, password: string){
    return this.http.post(this.baseURL + '/v1/auth/login',{
      username: username,
      password: password
    },{headers: this.headers})
  }


  logout(){
    return this.http.post(this.baseURL + '/v1/auth/logout',{});
  }


  username(){
    return this.http.get(this.baseURL + '/v1/auth/username');
  }

  children(id:string):Observable<any>{
    return this.http.get(this.baseURL + '/v1/config/' + id +'/children');
  }

  generatedConfig(id:string|number,encryptionkey:string):Observable<any>{
    return this.http.get(this.baseURL + '/v1/config/' + id + '/generate?key='+encryptionkey,{responseType: 'text'});
  }

  config(id:string|number|undefined = undefined, full:boolean = false):Observable<any>{
    return this.http.get(this.baseURL + '/v1/config' + (id != undefined ? '/' + id +'?preload=1' : '?root=1') + (full ? '&full=1':''));
  }

  postConfig(config:any) {
    return this.http.post(this.baseURL + '/v1/config' , {
      name: config.name,
      description: config.description,
      config_id: config.config_id
    });
  }

  putConfig(id:string|number, config:any) {
    this.http.put(this.baseURL + '/v1/config/' + id, {
      name: config.name,
      description: config.description,
      configdata: config.configdata
    }).subscribe();
  }
}
