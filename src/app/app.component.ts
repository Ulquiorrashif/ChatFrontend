import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PeopleListComponent} from "./components/pepople-list/pepople-list.component";
import {ChatComponent} from "./components/chat/chat.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PeopleListComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'ChatFrontend';
}
