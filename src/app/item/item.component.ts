import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Item } from "../interfaces/item";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  editable = false;

  @Input() item!: Item;
  @Output() remove = new EventEmitter<Item>();
  @Output() edit = new EventEmitter<Item>();

  saveItem(description: string) {
    if (!description) return;
    this.editable = false;
    this.item.description = description;
    this.edit.emit();
  }

  check(item: any){
    this.item.done = !item.done;
    this.edit.emit();
  }
  
}