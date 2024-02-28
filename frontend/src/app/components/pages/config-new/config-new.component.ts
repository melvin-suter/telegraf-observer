import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-config-new',
  templateUrl: './config-new.component.html',
  styleUrl: './config-new.component.scss'
})
export class ConfigNewComponent {
  config = {name: "", description:"",config_id:null,agentVersion: '1.29.5'}

  constructor(private api:ApiService, private router:Router, private route:ActivatedRoute){
    this.route.params.subscribe((params)=> {
      if(params['id']){
        this.config.config_id = params['id'];
      }
    });
  }

  create(){
    this.api.postConfig(this.config).subscribe((data:any) => {
      this.router.navigate(['config',data.id]);
    });
  }
}
