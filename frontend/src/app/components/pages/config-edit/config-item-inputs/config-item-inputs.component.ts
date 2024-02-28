import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-config-item-inputs',
  templateUrl: './config-item-inputs.component.html',
  styleUrl: './config-item-inputs.component.scss'
})
export class ConfigItemInputsComponent {
  @Input() config:any = {configdata:{agent:{},output:{},inputs:{}}};
  @Output() configChange = new EventEmitter<any>();

  showNewInput:boolean = false;
  newInput = "";
  Object = Object;
  

  addInput() {
    if(!this.config.configdata.inputs[this.newInput]){
      this.config.configdata.inputs[this.newInput] = "";
    }
    this.newInput = "";
    this.showNewInput= false;
  }

  removeInput(name:string){
    delete  this.config.configdata.inputs[name];
  }

}
