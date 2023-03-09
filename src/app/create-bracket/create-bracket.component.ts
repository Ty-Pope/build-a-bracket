import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Team } from '../team';
import { Match } from '../match';
import { BracketLogicService } from '../bracket-logic.service';
import { BracketData } from '../bracket-data';
import { BracketDataService } from '../bracket-data.service';

@Component({
 selector: 'app-create-bracket',
 templateUrl: './create-bracket.component.html',
 styleUrls: ['./create-bracket.component.css'],
})
export class CreateBracketComponent implements OnInit {
 constructor(public messageService: MessageService, public bracketLogic: BracketLogicService, public bracketData: BracketDataService) { }
 /**
  * teamAmount (number): the amount of teams in the bracket
  * team (JSON): Contains the data for teams (name, id, seed, wins, losses)
  * formatAmount (number): the number of format(s)
  * format (array): the format(s) used
  * roundTwo (number): the amount of teams going to round two
  * group (number): the amount of teams in each group
  */
 match: Match[][] = [];
 formatJSON: BracketData = {
  teamAmount: 0,
  team: [],
  formatAmount: 1,
  format: ['Swiss', 'Swiss'],
  amountRoundTwo: 0,
  group: 0,
  roundOne: this.match,
  roundTwo: this.match,
 };

 numberError: string = '';
 numVisible: boolean[] = [false, false, false];
 visibleArr: boolean[] = [true, false, false, false, false];
 winnerBracket: string = '';
 moveOnError: string = '';
 teamNameError: string = '';
 groupError: string = '';

 //Values needed
 teams: Array<Team> = [];
 numTeams: number = 0;
 formatNum: number = 0;
 formatSelect: string[] = ['', '', ''];
 firstMovement: number = 1;

 ngOnInit(): void { }

 teamNum(teamNum: string, formatAmount: string) {
  this.numVisible = [false, false, false];
  var numTeam = +teamNum;
  this.numTeams = numTeam;
  this.numberError = teamNum;
  this.formatNum = +formatAmount;
  this.formatJSON.teamAmount = numTeam;
  this.teams = [];
  for (let i = 0; i < numTeam; i++) {
   this.teams.push({
    id: i,
    name: `team ${i + 1}`,
    seed: i + 1,
    eliminated: false,
    groupOne: [],
    groupTwo: [],
   });
  }
  this.formatJSON.team = this.teams;
  if (this.numberError == '') {
   this.numberError = 'Please input a value';
  } else if (numTeam < 2) {
   this.numberError = 'Please input a number above 1.';
  } else {
   this.visibleArr[0] = false;
   this.visibleArr[1] = true;
   this.numberError = '';
   var numFormat = +formatAmount;
   this.formatJSON.formatAmount = numFormat;
   for (let j = 0; j < numFormat; j++) {
    this.numVisible[j] = true;
    this.formatSelect[j] = 'Swiss';
    this.formatJSON.format[j] = 'Swiss';
   }
  }
 }
 formatChange(i: number, value: string) {
  this.formatSelect[i] = value;
  if (value === 'Swiss' || value === 'Group') {
   this.winnerBracket = '*NOTE* This final format will create no winner.';
  } else {
   this.winnerBracket = '';
  }
 }
 back(val: number) {
  if (val == 3 && this.formatJSON.formatAmount == 1) {
   this.visibleArr[val - 2] = true;
  } else {
   this.visibleArr[val - 1] = true;
  }
  this.visibleArr[val] = false;
 }
 formatButton() {
  if (this.formatSelect[0] == this.formatSelect[1]) {
   this.winnerBracket = "That doesn't make sense! Use two different formats.";
  } else if (this.formatSelect[0] == 'Group' || this.formatSelect[1] == 'Group') {
   let prime = this.isPrime();
   if (prime) {
    this.winnerBracket = "Groups stage must have a non-prime number of teams.";
   } else {
    if (this.formatNum === 2) {
     this.visibleArr[1] = false;
     this.visibleArr[2] = true;
     this.formatJSON.format = this.formatSelect;
    } else {
     this.visibleArr[1] = false;
     this.visibleArr[3] = true;
     this.formatJSON.format = this.formatSelect;
    }
   }
  } else {
   if (this.formatNum === 2) {
    this.visibleArr[1] = false;
    this.visibleArr[2] = true;
    this.formatJSON.format = this.formatSelect;
   } else {
    this.visibleArr[1] = false;
    this.visibleArr[3] = true;
    this.formatJSON.format = this.formatSelect;
   }
  }
 }
 //Returns true if it is prime and false if it is not.
 isPrime() {
  for (let i = 2; i < this.formatJSON.teamAmount; i++) {
   if (this.formatJSON.teamAmount % i == 0) {
    return false;
   }
  }
  return true;
 }
 movement(teamMovingOn: string) {
  var movement = +teamMovingOn;
  if (this.numTeams < movement) {
   this.moveOnError =
    "You can't have more teams move on than are competing!";
  } else if (movement < 2) {
   this.moveOnError = 'Please enter a number greater than 2.';
  } else {
   this.firstMovement = movement;
   this.formatJSON.amountRoundTwo = movement;
   this.visibleArr[2] = false;
   this.visibleArr[3] = true;
  }
 }
 teamName(name: string, index: number) {
  this.teams[index].name = name;
 }
 teamSead(seed: number, index: number) {
  this.teams[index].seed = seed;
 }
 bracketCreate() {
  if (this.allUniqueValue()) {
   this.formatJSON.team = this.teams;
   if (this.formatJSON.format[0] == 'Group' || this.formatJSON.format[1] == 'Group') {
    this.visibleArr[3] = false;
    this.visibleArr[4] = true;
   } else {
    let match = this.bracketLogic.createBracket(this.formatJSON);
    this.formatJSON.roundOne = match;
    this.bracketData.updateMatch(match);
    this.visibleArr[3] = false;
    this.visibleArr[5] = true;
   }
  }
 }
 allUniqueValue() {
  for (let i = 0; i < this.teams.length; i++) {
   for (let j = i + 1; j < this.teams.length; j++) {
    if (this.teams[i].name == this.teams[j].name) {
     this.teamNameError = `Seed ${this.teams[i].seed} and seed ${this.teams[j].seed} have the same name. Please change one of those values.`;
     return false;
    }
   }
  }
  return true;
 }
 groupStage(groupAmount: number) {
  if (this.formatJSON.teamAmount % groupAmount == 0) {
   this.formatJSON.group = groupAmount;
   this.messageService.add(JSON.stringify(this.bracketLogic.createBracket(this.formatJSON)));
   this.visibleArr[4] = false;
   this.visibleArr[5] = true;
  } else if (this.formatJSON.teamAmount <= groupAmount) {
   this.groupError = 'Enter a group number less than the team amount.';
  } else if (groupAmount < 2) {
   this.groupError = 'There needs to be at least 2 groups.'
  } else {
   this.groupError = 'Please enter a number that leaves no remainder. i.e. Number of teams is 20. A correct input would be 4.'
  }
 }
}