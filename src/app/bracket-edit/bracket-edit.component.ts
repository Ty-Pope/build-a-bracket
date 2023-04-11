import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { BracketDataService } from '../bracket-data.service';
import { BracketData } from '../bracket-data';
import { Team } from '../team';

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
 public teamOne: Team = { id: -1, name: '', wins: 0, loss: 0, tie: 0 }
 public teamTwo: Team = { id: -1, name: '', wins: 0, loss: 0, tie: 0 };
 public groupError: string = '';
 private groupArrCol: number = 0;
 private groupArrRow: number = 0;

 msg(txt: string) {
  this.messageService.add(txt);
 }

 inputGroupScore(teamOne: Team, teamTwo: Team, arrCol: number, arrRow: number) {
  this.teamOne = teamOne;
  this.teamTwo = teamTwo;
  this.groupArrCol = arrCol
  this.groupArrRow = arrRow;
 }

 groupCancel() {
  this.teamOne = { id: -1, name: '', wins: 0, loss: 0, tie: 0 };
  this.teamTwo = { id: -1, name: '', wins: 0, loss: 0, tie: 0 };
 }

 groupSubmit(scoreOne: number, scoreTwo: number) {
  if ((!scoreOne || !scoreTwo) && (scoreOne != 0 || scoreTwo != 0)) {
   this.groupError = "Please input score for both teams."
  } else {
   this.teamOne.groupOne?.push({ team1: this.teamOne, team2: this.teamTwo, team1Score: scoreOne, team2Score: scoreTwo });
   this.teamTwo.groupOne?.push({ team1: this.teamOne, team2: this.teamTwo, team1Score: scoreOne, team2Score: scoreTwo })
   if (scoreOne > scoreTwo) {
    this.teamOne.wins++;
    this.teamTwo.loss++;
   } else if (scoreTwo > scoreOne) {
    this.teamTwo.wins++;
    this.teamOne.loss++;
   } else {
    this.teamOne.tie++;
    this.teamTwo.tie++;
   }
   this.bracket.groupMatches[this.groupArrCol][this.groupArrRow].team1Score = scoreOne;
   this.bracket.groupMatches[this.groupArrCol][this.groupArrRow].team2Score = scoreTwo;
   this.teamOne = { id: -1, name: '', wins: 0, loss: 0, tie: 0 };
   this.teamTwo = { id: -1, name: '', wins: 0, loss: 0, tie: 0 };
  }
 }
}
