import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Team } from '../team';
import { Match } from '../match';
import { BracketDataService } from '../bracket-data.service';

@Component({
 selector: 'app-bracket-edit',
 templateUrl: './bracket-edit.component.html',
 styleUrls: ['./bracket-edit.component.css']
})
export class BracketEditComponent implements OnInit {

 constructor(public messageService: MessageService, public bracketData: BracketDataService) { }

 ngOnInit(): void {
 }
 bracket: Match[][] = this.bracketData.getMatch();

}
