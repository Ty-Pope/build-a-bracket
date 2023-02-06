import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-my-brackets',
  templateUrl: './my-brackets.component.html',
  styleUrls: ['./my-brackets.component.css'],
})
export class MyBracketsComponent implements OnInit {
  constructor(public messageService: MessageService) {}
  numberError: String = '';
  formatError: String = '';

  ngOnInit(): void {}
  teamNum(teamNum: string, format: string) {
    var numTeam = +teamNum;
    this.messageService.add(teamNum);
    this.numberError = teamNum;
    this.formatError = format;
    if (this.numberError == '') {
      this.numberError = 'Please input a value';
    } else if(numTeam < 2) {
     this.numberError = 'Please input a number above 2.'
    }
  }
  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
