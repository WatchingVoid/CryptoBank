
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  filterItems<T>(items: T[], searchTerm: string, fields: (keyof T)[]): T[] {
    if (!searchTerm) {
      return items;
    }
    return items.filter(item => 
      fields.some(field => 
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }
}