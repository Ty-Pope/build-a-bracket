import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { BracketDataService } from '../bracket-data.service';
import { BracketData } from '../bracket-data';

@Component({
 selector: 'app-bracket-edit',
 templateUrl: './bracket-edit.component.html',
 styleUrls: ['./bracket-edit.component.css']
})
export class BracketEditComponent implements OnInit {

 constructor(public messageService: MessageService, public bracketData: BracketDataService) { }

 ngOnInit(): void {
 }
 public bracket: BracketData = this.bracketData.getMatch();
 public bracketString: string = JSON.stringify(this.bracket);
}
