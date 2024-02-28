import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  username = "$$USERNAME$$";
  constructor(private api:ApiService, private router:Router){
    this.api.username().subscribe((data:any) => this.username = data.username);
  }

  logout(){
    this.api.logout().subscribe(() => {});
    this.router.navigate(['/auth/login']);
  }
}
