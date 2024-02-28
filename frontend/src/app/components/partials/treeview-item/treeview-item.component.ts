import { Component, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-treeview-item',
  templateUrl: './treeview-item.component.html',
  styleUrl: './treeview-item.component.scss'
})
export class TreeviewItemComponent {
  @Input('item') item:any = {};
  showItem:boolean =false;
  hasChildren:boolean = false;
  items:any;
  constructor(private api:ApiService){}

  ngOnInit() {
    this.items = this.api.children(this.item.id);
    this.api.children(this.item.id).subscribe(data => this.hasChildren = data.length > 0);
  }
}
