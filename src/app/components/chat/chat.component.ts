import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http-service.service";
import {HttpClientModule, HttpHeaders, HttpParams} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {PeopleListItemComponent} from "../pepople-list/people-list-item/people-list-item.component";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {catchError, map} from "rxjs";
import {environment} from "../../../environments/environment";



@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [HttpClientModule, FormsModule, PeopleListItemComponent],
  providers:[HttpService],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  messageToSend:String=""
  author:string=""
  messageList:any[]=[];
  userName:string="";
  errorMessage:string=""
  list:string[]=[];
  constructor(private http:HttpService,private router: Router,private  dataService:DataService) {
    this.author=dataService.author
    console.log()
  }
  sendMessage() {
    console.log(this.messageList, this.author )
    console.log("ChatComponent"+this.messageToSend)
    this.http.sendMessage(this.messageToSend)
  }
  addMessage(messageOutput: any) {
    console.log("До добавление "+this.messageList.length)
    this.messageList.push(messageOutput)
    console.log("После добавление "+this.messageList.length)

  }
  connect(id: number) {
    let socket = new SockJS(environment.path+`/webs`);
    // console.log("socket", socket);
    if (this.dataService.stompClient===undefined){
      this.dataService.stompClient = Stomp.over(socket);
    }
    // console.log("Stomp Client:", this.dataService.stompClient);
    this.http.getAllMessage(this.author).subscribe({next:(data: any) => {
        console.log(data, "Список сообщений из запроса")
        this.messageList=data}});
    this.dataService.stompClient.connect({}, (frame: any) => {
      // console.log('ME Connected: ' + frame);
      this.dataService.stompClient.subscribe(`/topic/99`, (messageOutput: any) => {
        // console.log("GGGG"+JSON.parse(messageOutput.body));
        // Здесь добавьте логику для обработки полученных сообщений
        this.addMessage(JSON.parse(messageOutput.body));
        // showMessageOutput(JSON.parse(messageOutput.body));
      });
    });
    console.log(this.dataService.stompClient)
  }


  ngOnInit(): void {
    this.http.getFriends().subscribe({next:(data: any) =>{this.list=data} })
    console.log("Компонент списка "+this.list)
  }
  onClick() {
    console.log("CLICK on CHat")
    this.joinChat(this.userName)

  }
  joinChat(name:string) {
    const params = new HttpParams()
      .set("name", name?.toString());
    console.log("joinChat", name)
    const myHeaders = new HttpHeaders().set("Authorization", "Bearer " + this.http.getToken());
    let response=this.http.gethttp().get(environment.path+`/api/chats/create`,{headers:myHeaders,params}).pipe(map((data: any) => {
      console.log("Ответ при Создании чата");
      console.log(data);
      return data;
    }), catchError(err => {
      console.log(err);
      this.errorMessage = err.message;
      console.log("Отказ при создании чата ");
      this.router.navigateByUrl("/login").then(r => {});
      console.log(this.errorMessage);
      return err;
    }));

    response.subscribe({next:(data: any) => {this.dataService.chatId=data;

        this.connect(data);
      }})
  }



  onChanged($event: string) {
    this.userName=$event
    console.log("EHF &",$event)
    this.joinChat($event)
  }

  logOut() {
    this.http.setToken("");
    this.http.logOut();
  }
}
