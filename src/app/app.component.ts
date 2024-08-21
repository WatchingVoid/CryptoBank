import { Component, OnInit } from '@angular/core';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  theme: string = 'light';
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getTheme().subscribe(theme => {
      this.theme = theme;
      document.body.className = '';  // Убираем все классы
      document.body.classList.add(this.theme);  // Добавляем текущую тему
    });
  }
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
}
