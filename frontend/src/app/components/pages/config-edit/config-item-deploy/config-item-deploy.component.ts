import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-config-item-deploy',
  templateUrl: './config-item-deploy.component.html',
  styleUrl: './config-item-deploy.component.scss'
})
export class ConfigItemDeployComponent implements OnChanges {
  @Input() config:any = {};
  @Output() configChange = new EventEmitter<any>();
  powershellCommand = "";
  currentHostname="";
  bashCommand = "";
  generatedConfig = "";
  fullConfig:any = {configdata:{agent:{},output:{},inputs:{}}};

  constructor(private api:ApiService, private loc:Location){
 
  }

  ngOnInit() {
    const angularRoute = this.loc.path();
    const url = window.location.href;
    this.currentHostname = url.replace(angularRoute, ''); 
  }

  ngOnChanges(changes: SimpleChanges) {
    this.api.generatedConfig(this.config.id, this.config.encryptionkey).subscribe(data =>this.generatedConfig = data);

    this.api.config(this.config.id,true).subscribe(config => {
      this.fullConfig = config;

      this.powershellCommand = "& $([scriptblock]::Create((New-Object Net.WebClient).DownloadString(\"" + this.currentHostname +"/assets/deploy/windows.ps1\"))) `";
      this.powershellCommand += "\n-TELEGRAF_VERSION=1.29.5 `";
      this.powershellCommand += "\n-OBSERVER_URL=\"" + this.currentHostname + "\" `";
      this.powershellCommand += "\n-CONFIG_ID=" + this.fullConfig.id + " `";
      if(this.fullConfig.configdata.scriptDirWin) {this.powershellCommand += "\n-SCRIPT_DIR=" + this.fullConfig.configdata.scriptDirWin + " `";}
      this.powershellCommand += "\n-ENCRYPTION_KEY=\"" + this.fullConfig.encryptionkey +"\"";

      this.bashCommand = "export TELEGRAF_VERSION=1.29.5 \\";
      this.bashCommand += "\nexport OBSERVER_URL=\"" + this.currentHostname + "\" \\";
      this.bashCommand += "\nexport CONFIG_ID=" + this.fullConfig.id + " \\";
      this.bashCommand += "\nexport SCRIPT_DIR=" + (this.fullConfig.configdata.scriptDirLnx ?? '/opt/telegraf-scripts') + " \\";
      this.bashCommand += "\nexport ENCRYPTION_KEY=\"" + this.fullConfig.encryptionkey + "\" ";
      this.bashCommand += "\ncurl \"" + this.currentHostname + "/assets/deploy/linux.sh\" | bash ";
    });

  }
}
