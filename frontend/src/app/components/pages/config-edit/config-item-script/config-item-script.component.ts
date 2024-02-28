import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-config-item-script',
  templateUrl: './config-item-script.component.html',
  styleUrl: './config-item-script.component.scss'
})
export class ConfigItemScriptComponent {
  @Input() config:any = {configdata:{agent:{},output:{},inputs:{},scripts:{}}};
  @Output() configChange = new EventEmitter<any>();

  showNewScript:boolean = false;
  newScript = "";
  Object = Object;
  
  addScript() {
    if(!this.config.configdata.scripts[this.newScript]){
      this.config.configdata.scripts[this.newScript] = "";
    }
    this.newScript = "";
    this.showNewScript= false;
  }

  removeScript(name:string){
    delete  this.config.configdata.scripts[name];
  }

}
