import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme = new BehaviorSubject<string>('light'); // Светлая тема по умолчанию

  constructor() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.theme.next(savedTheme);
    this.applyTheme(savedTheme);
  }

  toggleTheme(): void {
    const newTheme = this.theme.value === 'light' ? 'dark' : 'light';
    this.theme.next(newTheme);
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  getTheme(): BehaviorSubject<string> {
    return this.theme;
  }

  private applyTheme(theme: string): void {
    document.body.classList.toggle('dark-theme', theme == 'dark');
  }
}
