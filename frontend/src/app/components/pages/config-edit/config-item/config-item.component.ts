import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-config-item',
  templateUrl: './config-item.component.html',
  styleUrl: './config-item.component.scss'
})
export class ConfigItemComponent {

  selectedTab:number = 0;
  config:any={
    configdata:{agent:{},inputs:{},output:{}}
  };

  currentHostname = "";
  configName = "";
  configDesc = "";

  save() {
    this.api.putConfig(this.config.id, this.config);
    window.location.reload();
  }

  constructor(private api:ApiService, private route:ActivatedRoute){
  

    this.route.params.subscribe(param=> {

      this.api.config(param['id']).subscribe(data => {
        this.config = data[0];
        

        this.configName = this.config.name;
        this.configDesc = this.config.description;

        if(!this.config.configdata || this.config.configdata == null) {
          this.config.configdata = {};
        }
        if(!this.config.configdata.agent || this.config.configdata.agent == null) {
          this.config.configdata.agent = {};
        }
        if(!this.config.configdata.output || this.config.configdata.output == null) {
          this.config.configdata.output = {};
        }
        if(!this.config.configdata.inputs || this.config.configdata.inputs == null) {
          this.config.configdata.inputs = {};
        }
        if(!this.config.configdata.scripts || this.config.configdata.scripts == null) {
          this.config.configdata.scripts = {};
        }
        
      });
    });
  }

}
