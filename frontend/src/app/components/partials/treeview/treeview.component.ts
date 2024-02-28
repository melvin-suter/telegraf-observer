import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrl: './treeview.component.scss'
})
export class TreeviewComponent {
  items = this.api.config();
  constructor(private api:ApiService){}
}
