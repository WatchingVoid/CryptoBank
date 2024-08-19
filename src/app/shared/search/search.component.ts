
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: `./search.component.html`,
  styleUrls: [`./search.component.scss`]
})
export class SearchComponent {
  searchTerm: string = '';
  
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }
}