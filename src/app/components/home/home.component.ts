import { Component } from '@angular/core';
import {ChatComponent} from "../chat/chat.component";
import {PeopleListComponent} from "../pepople-list/pepople-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        ChatComponent,
        PeopleListComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor() { }

  createTournament() {
    console.log('Переход к созданию турнира');
    // Добавьте здесь логику перехода или открытия формы создания турнира
  }

  register() {
    console.log('Переход к регистрации');
    // Добавьте здесь логику для регистрации пользователя
  }

  login() {
    console.log('Переход к авторизации');
    // Добавьте здесь логику для авторизации пользователя
  }
}
