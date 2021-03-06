import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

  messageSubject: Subject<any> = new Subject<any>();

  addMessage(message: any) {
    this.messageSubject.next(message);
    console.log('Message added: ' + message)
  }

  ngOnInit(): void {
  }

  YYYYMMDD(date: Date): string {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  millisToDuration(millis: number) {
    let days = Math.floor(millis / 86400000);
    millis = (millis - days * 86400000);
    let hours = Math.floor(millis / 3600000);
    millis = (millis - hours * 3600000);
    let minutes = Math.floor(millis / 60000);
    let seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0));
    return (days < 10 ? '0' : '') + days + ' ' + (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }


}
