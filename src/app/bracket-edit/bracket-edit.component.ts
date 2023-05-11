import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { BracketDataService } from '../bracket-data.service';
import { BracketData } from '../bracket-data';
import { Team } from '../team';
import { Match } from '../match';

@Component({
 selector: 'app-bracket-edit',
 templateUrl: './bracket-edit.component.html',
 styleUrls: ['./bracket-edit.component.css']
})
export class BracketEditComponent implements OnInit {
 constructor(public messageService: MessageService, public bracketData: BracketDataService) { }

 ngOnInit(): void { }
 private match: Match[] = [];
 public bracket: BracketData = this.bracketData.getMatch();
 public bracketString: string = JSON.stringify(this.bracket);
 public teamOne: Team = { id: -1, name: '', wins: 0, loss: 0, tie: 0, groupOne: this.match, groupTwo: this.match };
 public teamTwo: Team = { id: -1, name: '', wins: 0, loss: 0, tie: 0, groupOne: this.match, groupTwo: this.match };
 public groupError: string = '';
 public groupFinished: boolean = false;
 public singleWinner: string = '';

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
 cancel() {
  this.teamOne = { id: -1, name: '', wins: 0, loss: 0, tie: 0, groupOne: this.match, groupTwo: this.match };
  this.teamTwo = { id: -1, name: '', wins: 0, loss: 0, tie: 0, groupOne: this.match, groupTwo: this.match };
 }
 submit(scoreOne: number, scoreTwo: number) {
  if (this.bracket.format[0] == 'Group' || this.bracket.format[0] == 'Round Robin' || this.bracket.format[0] == 'Single Elimination' && this.bracket.finished == false) {
   this.teamOne.groupOne?.push({ team1: this.teamOne, team2: this.teamTwo, team1Score: scoreOne, team2Score: scoreTwo });
   this.teamTwo.groupOne?.push({ team1: this.teamOne, team2: this.teamTwo, team1Score: scoreOne, team2Score: scoreTwo });
  } else {
   this.teamOne.groupTwo?.push({ team1: this.teamOne, team2: this.teamTwo, team1Score: scoreOne, team2Score: scoreTwo });
   this.teamTwo.groupTwo?.push({ team1: this.teamOne, team2: this.teamTwo, team1Score: scoreOne, team2Score: scoreTwo });
  }
  if (!scoreOne || !scoreTwo) {
   this.groupError = "Please input scores for both teams.";
  } else if ((this.bracket.format[0] == 'Single Elimination' || (this.bracket.format[1] == 'Single Elimination' && this.bracket.finished == true)) && scoreOne == scoreTwo) {
   this.groupError = "There cannot be a tie in single elimination.";
  } else {
   this.groupError = '';
   //Checks if there is already scores inputed
   try {
    //Update general teams
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
   } finally {
    //Group data updating
    if (this.bracket.format[0] == 'Group' || (this.bracket.format[1] == 'Group' && this.bracket.finished == true)) {
     this.bracket.groupMatches[this.groupArrCol][this.groupArrRow].team1Score = scoreOne;
     this.bracket.groupMatches[this.groupArrCol][this.groupArrRow].team2Score = scoreTwo;
     //Update the group table to put teams up on top
     this.bracket.groupOrder = this.updateGroupTable(this.groupArrCol);
     let finished = true;
     for (let i = 0; i < this.bracket.groupMatches.length; i++) {
      for (let j = 0; j < this.bracket.groupMatches[i].length; j++) {
       if (this.bracket.groupMatches[i][j].team1Score == null) {
        finished = false;
        break;
       }
      }
      if (finished == false) {
       break;
      }
     }
     if (finished) {
      this.groupFinished = true;
      this.bracket.finished = true;
     }
    }
    if (this.bracket.format[0] == 'Round Robin' || (this.bracket.format[1] == 'Round Robin' && this.bracket.finished == true)) {
     if (this.bracket.format[0] == 'Round Robin') {
      this.teamOne.groupOne?.push({ team1: this.teamOne, team2: this.teamTwo, team1Score: scoreOne, team2Score: scoreTwo });
      this.teamTwo.groupOne?.push({ team1: this.teamOne, team2: this.teamTwo, team1Score: scoreOne, team2Score: scoreTwo });
      this.bracket.robinMatch[this.groupArrCol][this.groupArrRow].team1Score = scoreOne;
      this.bracket.robinMatch[this.groupArrCol][this.groupArrRow].team2Score = scoreTwo;
      this.bracket.robinMatch[this.groupArrRow][this.groupArrCol].team1Score = scoreOne;
      this.bracket.robinMatch[this.groupArrRow][this.groupArrCol].team2Score = scoreTwo;

      let finished = true;
      for (let i = 0; i < this.bracket.robinMatch.length; i++) {
       for (let j = 0; j < this.bracket.robinMatch[i].length; j++) {
        if (this.bracket.robinMatch[i][j].team1Score == null) {
         finished = false;
         break;
        }
       }
       if (finished == false) {
        break;
       }
      }
      if (finished) {
       this.groupFinished = true;
       this.bracket.finished = true;
      }
     } else {
      this.teamOne.groupTwo?.push({ team1: this.teamOne, team2: this.teamTwo, team1Score: scoreOne, team2Score: scoreTwo });
      this.teamTwo.groupTwo?.push({ team1: this.teamOne, team2: this.teamTwo, team1Score: scoreOne, team2Score: scoreTwo });
      this.bracket.robinMatch[this.groupArrCol][this.groupArrRow].team1Score = scoreOne;
      this.bracket.robinMatch[this.groupArrCol][this.groupArrRow].team2Score = scoreTwo;
      this.bracket.robinMatch[this.groupArrRow][this.groupArrCol].team1Score = scoreOne;
      this.bracket.robinMatch[this.groupArrRow][this.groupArrCol].team2Score = scoreTwo;

      let finished = true;
      for (let i = 0; i < this.bracket.robinMatch.length; i++) {
       for (let j = 0; j < this.bracket.robinMatch[i].length; j++) {
        if (this.bracket.robinMatch[i][j].team1Score == null) {
         finished = false;
         break;
        }
       }
       if (finished == false) {
        break;
       }
      }
      if (finished) {
       this.groupFinished = true;
       this.bracket.finished = true;
      }
     }
    }
    if (this.bracket.format[0] == 'Single Elimination' || (this.bracket.format[1] == 'Single Elimination' && this.bracket.finished == true)) {
     let t = this.groupArrCol - (this.groupArrCol % 2);
     this.bracket.singleMatch[this.groupArrRow][this.groupArrCol].team1Score = scoreOne;
     this.bracket.singleMatch[this.groupArrRow][this.groupArrCol].team2Score = scoreTwo;
     if (this.bracket.singleMatch.length !== this.groupArrRow + 1) {
      if (this.bracket.singleMatch[this.groupArrRow + 1][t].team1 == null && scoreOne > scoreTwo) {
       console.log('= null and one > two');
       this.bracket.singleMatch[this.groupArrRow + 1][t].team1 = this.bracket.singleMatch[this.groupArrRow][this.groupArrCol].team1;
      } else if (this.bracket.singleMatch[this.groupArrRow + 1][t].team1 == null && scoreOne < scoreTwo) {
       console.log('= null and one < two');
       this.bracket.singleMatch[this.groupArrRow + 1][t].team1 = this.bracket.singleMatch[this.groupArrRow][this.groupArrCol].team2;
      } else if (!this.bracket.singleMatch[this.groupArrRow + 1][t].team1 != null && scoreOne > scoreTwo) {
       console.log('!= null and one > two');
       this.bracket.singleMatch[this.groupArrRow + 1][t].team2 = this.bracket.singleMatch[this.groupArrRow][this.groupArrCol].team1;
      } else if (!this.bracket.singleMatch[this.groupArrRow + 1][t].team1 != null && scoreOne < scoreTwo) {
       console.log('!= null and one < two');
       this.bracket.singleMatch[this.groupArrRow + 1][t].team2 = this.bracket.singleMatch[this.groupArrRow][this.groupArrCol].team2;
      }
     } else {
      this.bracket.finished = true;
      if (scoreOne > scoreTwo) {
       this.singleWinner = this.bracket.singleMatch[this.groupArrRow][this.groupArrCol].team1.name;
      } else {
       this.singleWinner = this.bracket.singleMatch[this.groupArrRow][this.groupArrCol].team2.name;
      }
     }
    }
    //Clears teams
    this.teamOne = { id: -1, name: '', wins: 0, loss: 0, tie: 0, groupOne: this.match, groupTwo: this.match };
    this.teamTwo = { id: -1, name: '', wins: 0, loss: 0, tie: 0, groupOne: this.match, groupTwo: this.match };
   }
  }
 }
 inputRobinScore(arrCol: number, arrRow: number) {
  this.teamOne = this.bracket.team[arrCol];
  this.teamTwo = this.bracket.team[arrRow];
  this.groupArrCol = arrCol;
  this.groupArrRow = arrRow;
 }
 inputSingleScore(arrRow: number, arrCol: number) {
  console.log(arrRow);
  console.log(arrCol);
  if (this.bracket.singleMatch[arrRow][arrCol].team1 != null && this.bracket.singleMatch[arrRow][arrCol].team2 != null) {
   this.teamOne = this.bracket.singleMatch[arrRow][arrCol].team1;
   this.teamTwo = this.bracket.singleMatch[arrRow][arrCol].team2;
   this.groupArrCol = arrCol;
   this.groupArrRow = arrRow;
  }
 }
 updateGroupTable(column: number) {
  let tempGroup = this.bracket.groupOrder;
  let teamArr = [];
  let teamPoints = [];
  //Puts all the teams in the group in the same arr
  for (let i = 0; i < tempGroup[column].length; i++) {
   teamArr.push(this.bracket.team[tempGroup[column][i] - 1]);
  }
  let two = 0;
  for (let j = 0; j < teamArr.length; j++) {
   let pointRatio = 0
   if (this.bracket.finished == false) {
    for (let k = 0; k < teamArr.length; k++) {
     pointRatio += (teamArr[j]?.groupOne?.[k]?.team1Score ?? 0) - (teamArr[j]?.groupOne?.[k]?.team2Score ?? 0);
    }
   } else {
    for (let k = 0; k < teamArr.length; k++) {
     pointRatio += (teamArr[j]?.groupOne?.[k]?.team1Score ?? 0) - (teamArr[j]?.groupOne?.[k]?.team2Score ?? 0);
    }
   }
   teamPoints.push({ teamID: teamArr[j].id, teamRatio: teamArr[j].wins - teamArr[j].loss, pointRatio: pointRatio })
  }
  console.log(teamPoints);
  return tempGroup;
 }
}
