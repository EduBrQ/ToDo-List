import { Component } from "@angular/core";
import { Item } from "./interfaces/item";
import items from "./items.json"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "todo";
  pageOfItems!: Array<Item>;
  filter: "all" | "active" | "done" = "all";
  page = 1;
  count = 0;
  pageSize = 12;
  pageSizes = [3, 6, 9, 12, 15, 20, 30, 50, 100];
  allItems = items;

  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item: Item) =>
      this.filter === "done" ? item.done : !item.done
    );
  }

  // this functions and treatments about Data should be done on a Service, but I did this way to be quickly.
  addItem(description: string) {
    this.allItems.unshift({
      description,
      done: false
    });
    this.saveItens();
  }

  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
    this.saveItens();
  }

  edit() {
    this.saveItens();
  }

  saveItens() {
    localStorage.setItem('items', JSON.stringify(this.allItems));
  }


  handlePageChange(pageOfItems: any) {
    this.page = pageOfItems;
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  constructor() {
    if (localStorage.getItem('items')) {
      this.allItems = JSON.parse(localStorage.getItem('items') || '{}');
    } else {
      this.allItems = items;
    }
  }

}