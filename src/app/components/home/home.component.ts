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

}
