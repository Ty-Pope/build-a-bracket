import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-my-brackets',
  templateUrl: './my-brackets.component.html',
  styleUrls: ['./my-brackets.component.css'],
})
export class MyBracketsComponent implements OnInit {
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {}
  teamNum(teamNum: string) {
    this.messageService.add(teamNum);
  }
}
