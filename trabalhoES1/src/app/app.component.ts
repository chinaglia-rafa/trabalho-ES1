import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trabalhoES1';

  public menu = [
    { name: 'Login', icon: 'login', link: '/login' },
    { name: 'Home', icon: 'home', link: '/home' },
    { name: 'Relatórios', icon: 'grading', link: '/relatorios/list' },
    { name: 'Sobre', icon: 'info', link: '/about' },
  ];
}
