import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-config-item-agent',
  templateUrl: './config-item-agent.component.html',
  styleUrl: './config-item-agent.component.scss'
})
export class ConfigItemAgentComponent {
  @Input() config:any = {configdata:{agent:{},output:{},inputs:{}}};
  @Output() configChange = new EventEmitter<any>();

  constructor(){
  }

}
