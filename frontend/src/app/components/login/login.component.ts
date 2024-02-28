import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username:string = "";
  password:string = "";
  showError:boolean = false;

  constructor(private api:ApiService, private router:Router){}

  resetError() {
    this.showError = false;
  }

  login(){
    this.api.login(this.username,this.password).subscribe((res) => {
        this.router.navigate(["/"]);
      },
      error => this.showError = true
    );
  }

}
