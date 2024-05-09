import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _chatId:number=-1;
  private _author:string=""
  private _stompClient:any
  get stompClient() {
    console.log("get"+this._stompClient)
    return this._stompClient;
  }

  set stompClient(value) {
    console.log("set"+this._stompClient)
    this._stompClient = value;
  }

  constructor() { }

  get chatId(): number {
    return this._chatId;
  }

  set chatId(value: number) {
    this._chatId = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }
}
