import { Injectable } from '@angular/core';
import { Team } from './team';
import { BracketData } from './bracket-data';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class BracketLogicService {
  constructor(public messageService: MessageService) {}
  createBracket(data: BracketData) {
    if (data.format[0] == 'Swiss') {
      this.swiss(data);
    } else if (data.format[0] == 'Group') {
      this.groups(data);
    } else if (data.format[0] == 'Round Robin') {
      this.roundRobin(data);
    } else if (data.format[0] == 'Single Elimination') {
      this.singleElim(data);
    } else if (data.format[0] == 'Double Elimination') {
      this.doubleElim(data);
    } else {
      this.messageService.add('Uh oh! Something is wrong!');
    }
  }
  swiss(data: BracketData) {}
  groups(data: BracketData) {}
  roundRobin(data: BracketData) {}
  singleElim(data: BracketData) {}
  doubleElim(data: BracketData) {}
}
