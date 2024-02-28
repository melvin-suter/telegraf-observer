import { Component, Input, Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-config-item-input',
  templateUrl: './config-item-input.component.html',
  styleUrl: './config-item-input.component.scss'
})
export class ConfigItemInputComponent {
  @Input() configValue:any = undefined;
  @Output() configValueChange = new EventEmitter<any>();

  @Input() parentConfig:any = undefined;
  @Input() label:any = "label";
  @Input() subLabel:any = "";
  @Input() defaultValue:any = "";

  constructor(){
  }

  toggle() {
    this.configValue = this.configValue != undefined ? undefined : this.defaultValue;
    this.configValueChange.emit(this.configValue);
  }
}
