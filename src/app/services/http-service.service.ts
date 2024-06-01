import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import SockJS from 'sockjs-client';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import {DataService} from "./data.service";
import {environment} from "../../environments/environment";


@Injectable()
export class HttpService {
  errorMessage: String = "";
  constructor(private http: HttpClient,private router: Router,private dataService: DataService) { }
  setToken(token:string | null):void{
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }
  getToken():string | null{
    return window.localStorage.getItem("auth_token");
  }
  gethttp(){
    return  this.http
  }

  getFriends():Observable<any> {
    const myHeaders = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(environment.path+`/api/users/allUsers`,{headers:myHeaders}).pipe(map((data: any) => {
      // console.log(data)
      return data;
    }), catchError(err => {
      // console.log(err);
      this.errorMessage = err.message;
      this.router.navigateByUrl("/login").then(r => {});
      // console.log(this.errorMessage);
      return err;
    }));
  }

  login(value: any){
    let response= this.http.post(environment.path+"/api/users/login", value).pipe(map((data: any) => {
      console.log("Ответ при логине");
      console.log(data);
      this.dataService.author=data.name;
      return data;
    }), catchError(err => {
      console.log(err);
      this.errorMessage = err.message;
      console.log("Отказ в доступе");
      console.log(environment.path+"/api/users/login");
      this.router.navigateByUrl("/login").then(r => {});
      console.log(this.errorMessage);
      return err;
    }));

    response.subscribe({next:(data: any) => {this.setToken(data.token);
        this.router.navigateByUrl("/").then(r => {});}})
  }

  registration(value:any) {
    let response= this.http.post(environment.path+"/api/users/create", value).pipe(map((data: any) => {
      console.log("Ответ при Регистрации");
      console.log(data);
      this.dataService.author=data.name;
      return data;
    }), catchError(err => {
      console.log(err);
      this.errorMessage = err.message;
      console.log("Отказ в доступе при регистрации");
      this.router.navigateByUrl("/login").then(r => {});
      console.log(this.errorMessage);
      return err;
    }));

    response.subscribe({next:(data: any) => {this.setToken(data.token);
        this.router.navigateByUrl("/").then(r => {});}})
  }


  // joinChat(name:string) {
  //   const params = new HttpParams()
  //     .set("name", name?.toString());
  //   console.log("joinChat", name)
  //   const myHeaders = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
  //   let response=this.http.get(`http://localhost:8080/api/chats/create`,{headers:myHeaders,params}).pipe(map((data: any) => {
  //     console.log("Ответ при Создании чата");
  //     console.log(data);
  //     return data;
  //   }), catchError(err => {
  //     console.log(err);
  //     this.errorMessage = err.message;
  //     console.log("Отказ при создании чата ");
  //     this.router.navigateByUrl("/login").then(r => {});
  //     console.log(this.errorMessage);
  //     return err;
  //   }));
  //   response.subscribe({next:(data: any) => {this.dataService.chatId=data;
  //     this.connect(data)}})
  // }
  // connect(id: number) {
  //   let socket = new SockJS(`http://localhost:8080/webs?token=${this.getToken()}`);
  //   console.log("socket", socket);
  //   this.dataService.stompClient = Stomp.over(socket);
  //   console.log("Stomp Client:", this.dataService.stompClient);
  //
  //   this.dataService.stompClient.connect({}, (frame: any) => {
  //     console.log('ME Connected: ' + frame);
  //     this.dataService.stompClient.subscribe(`/topic/99?token=${this.getToken()}`, (messageOutput: any) => {
  //       console.log("GGGG"+JSON.parse(messageOutput.body).text);
  //       // Здесь добавьте логику для обработки полученных сообщений
  //       // addMessage(JSON.parse(messageOutput.body));
  //       // showMessageOutput(JSON.parse(messageOutput.body));
  //     });
  //   });
  //   console.log(this.dataService.stompClient)
  // }

  // async connect(id: number) {
  //   let socket = new SockJS(`http://localhost:8080/webs?token=${this.getToken()}`);
  //   console.log("socket", socket);
  //   this.stompClient = Stomp.over(socket);
  //   console.log("Stomp Client:", this.stompClient);
  //
  //   await new Promise((resolve, reject) => {
  //     this.stompClient.connect({}, (frame: any) => {
  //       console.log('ME Connected: ' + frame);
  //       this.stompClient.subscribe(`/topic/99?token=${this.getToken()}`, (messageOutput: any) => {
  //         console.log(messageOutput);
  //         // addMessage(JSON.parse(messageOutput.body));
  //         // showMessageOutput(JSON.parse(messageOutput.body));
  //       });
  //       resolve(frame);  // Разрешить промис после успешного подключения
  //     }, (error: any) => {
  //       reject(error);  // Отклонить промис при ошибке подключения
  //     });
  //   });
  //   console.log(this.stompClient)
  // }


  sendMessage(content:String){

    console.log("Пользователь"+this.dataService.author,this.dataService.chatId,content)

    // let stompClient = Stomp.over(this.socket);
    console.log(this.dataService.author)
    this.dataService.stompClient.send("/app/webs", {},
      JSON.stringify({'chatId':this.dataService.chatId, 'text':content,'author':this.dataService.author}));

  }
//   public connect(id: number): void {
//     // Заменяем SockJS на нативный WebSocket
//     this.client = new WebSocket(`http://localhost:8080/gs-guide-websocket`);
//     //
//     // // Обработка открытия WebSocket соединения
//     // this.client.onopen = () => {
//     //   console.log('WebSocket connection established');
//     //
//     //   // Отправка токена аутентификации после установления соединения
//     //   // @ts-ignore
//     //   this.client.send("Bearer "+this.getToken());
//     //
//     //   // Настройка STOMP клиента
//     //   // this.initializeStompClient(id);
//     // };
//     //
//     // // Обработка ошибок WebSocket
//     // this.client.onerror = (error) => {
//     //   console.error('WebSocket error: ', error);
//     // };
//   }
//
//   // Инициализация и подписка с использованием STOMP
//   private initializeStompClient(id: number): void {
//     this.stompClient = Stomp.over(this.client); // Убедитесь, что библиотека STOMP.js может работать с нативным WebSocket
//
//     this.stompClient.connect({}, (frame: any) => {
//       console.log('Connected: ' + frame);
//
//       // Подписываемся на топик
//       this.stompClient.subscribe(`/topic/${id}`, (messageOutput: any) => {
//         console.log('Message received:', messageOutput);
//         // Обработайте сообщение, например, показать его в интерфейсе
//       });
//     });
//   }
  getAllMessage(name:string):Observable<any> {
    const params = new HttpParams()
        .set("id", this.dataService.chatId);
      console.log("joinChat", name)
      const myHeaders = new HttpHeaders().set("Authorization", "Bearer " + this.getToken());
    return this.http.get(environment.path+`/api/chats/get/message`,{headers:myHeaders,params}).pipe(map((data: any) => {
          console.log("Ответ при получении всех сообщений");
          console.log(data);
          return data;
        }), catchError(err => {
          console.log(err);
          this.errorMessage = err.message;
          console.log("Отказ при получении всех сообщений ");
          this.router.navigateByUrl("/login").then(r => {});
          console.log(this.errorMessage);
          return err;
        }));

  }

  logOut() {
    this.router.navigateByUrl("/login").then(r => {});
  }
}
