import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-config-item-output',
  templateUrl: './config-item-output.component.html',
  styleUrl: './config-item-output.component.scss'
})
export class ConfigItemOutputComponent {
  @Input() config:any = {configdata:{agent:{},output:{},inputs:{}}};
  @Output() configChange = new EventEmitter<any>();


}
