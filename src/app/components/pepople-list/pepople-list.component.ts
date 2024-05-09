import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http-service.service";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {PeopleListItemComponent} from "./people-list-item/people-list-item.component";

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [HttpClientModule, PeopleListItemComponent],
  providers: [HttpService],
  templateUrl: './pepople-list.component.html',
  styleUrl: './pepople-list.component.css'
})
export class PeopleListComponent implements OnInit{
  list:string[]|undefined;
  constructor(private service:HttpService,private router: Router) {
  }

  ngOnInit(): void {
    this.service.getFriends().subscribe({next:(data: any) =>{this.list=data} })
    console.log("Компонент списка "+this.list)
  }
}
