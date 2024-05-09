import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpService} from "../../../services/http-service.service";
import {HttpClientModule, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs";
import {DataService} from "../../../services/data.service";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {FormsModule} from "@angular/forms";
import {UpCasePipe} from "../../../pipes/up-case.pipe";

@Component({
  selector: 'app-people-list-item',
  standalone: true,
  imports: [HttpClientModule, FormsModule, UpCasePipe],
  providers: [HttpService],
  templateUrl: './people-list-item.component.html',
  styleUrl: './people-list-item.component.css'
})
export class PeopleListItemComponent {
  @Input() userName:string = "";

  @Output() onChanged = new EventEmitter<string>();
  change(increased:string) {
    this.onChanged.emit(increased);
  }
  // @Output() userNameChange = new EventEmitter<string>();
  // onNameChange(model: string){
  //
  //   this.userName = model;
  //   this.userNameChange.emit(model);
  // }


  // onClick() {
  //   console.log("CLICK on CHat")
  //   this.joinChat(this.userName)
  //
  // }
  // joinChat(name:string) {
  //   const params = new HttpParams()
  //     .set("name", name?.toString());
  //   console.log("joinChat", name)
  //   const myHeaders = new HttpHeaders().set("Authorization", "Bearer " + this.http.getToken());
  //   let response=this.http.gethttp().get(`http://localhost:8080/api/chats/create`,{headers:myHeaders,params}).pipe(map((data: any) => {
  //     console.log("Ответ при Создании чата");
  //     console.log(data);
  //     return data;
  //   }), catchError(err => {
  //     console.log(err);
  //     this.errorMessage = err.message;
  //     console.log("Отказ при создании чата ");
  //     // this.router.navigateByUrl("/login").then(r => {});
  //     console.log(this.errorMessage);
  //     return err;
  //   }));
  //   response.subscribe({next:(data: any) => {this.dataService.chatId=data;
  //       // this.connect(data)
  //   }})
  // }
  //
  // sendMessage(content:String){
  //
  //   console.log("Пользователь"+this.dataService.author,this.dataService.chatId,content)
  //
  //   // let stompClient = Stomp.over(this.socket);
  //   console.log(this.dataService.stompClient)
  //   this.dataService.stompClient.send("http://localhost:8080/app/webs", {},
  //     JSON.stringify({'chatId':this.dataService.chatId, 'text':content,'author':this.dataService.author}));
  //
  // }
}
