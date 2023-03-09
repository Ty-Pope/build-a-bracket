import { Injectable } from '@angular/core';
import { Team } from './team';
import { BracketData } from './bracket-data';
import { MessageService } from './message.service';
import { Match } from './match';
import { Data } from '@angular/router';

@Injectable({
 providedIn: 'root',
})
export class BracketLogicService {
 constructor(public messageService: MessageService) { }
 createBracket(data: BracketData) {
  if (data.format[0] == 'Swiss') {
   return this.swiss(data);
  } else if (data.format[0] == 'Group') {
   return this.groups(data);
  } else if (data.format[0] == 'Round Robin') {
   return this.roundRobin(data);
  } else if (data.format[0] == 'Single Elimination') {
   return this.singleElim(data);
  } else if (data.format[0] == 'Double Elimination') {
   return this.doubleElim(data);
  } else {
   this.messageService.add('Uh oh! Something is wrong!');
  }
  return JSON.parse('{}');
 }
 swiss(data: BracketData) {
  let swissJSON = {
   initialGroup: this.evenInitialMatch(data),
   bracketID: 0,
  }
  return swissJSON;
 }
 //Returns the groups based on seeding
 groups(data: BracketData) {
  let teamsGroup = data.teamAmount / data.group;
  let groupArr = [];
  let idIndex = 0;
  for (let i = 0; i < data.group; i++) {
   groupArr.push(new Array(teamsGroup));
  }
  for (let j = 0; j <= data.teamAmount; j++) {
   for (let k = 0; k < data.teamAmount; k++) {
    if (j == data.team[k].seed) {
     groupArr[data.team[k].id % data.group][idIndex] = j;
    }
   }
   if ((j % data.group == 0 && j != 0) || j == data.group) {
    idIndex++;
   }
  }
  let groupJSON = {
   initialGroup: groupArr,
   bracketID: 0,
  }
  return groupJSON;
 }
 roundRobin(data: BracketData) {
  let robin = [];
  for (let i = 0; i < data.teamAmount; i++) {
   robin.push(new Array(data.teamAmount - 1));
  }
  for (let j = 0; j < robin.length; j++) {
   for (let k = 0; k < robin[j].length; k++) {
    if (k + j + 1 < robin.length) {
     robin[j][k] = k + j + 2;
    } else {
     robin[j][k] = (k + j) % (robin.length - 1) + 1;
    }
   }
  }
  let roundJSON = {
   initialGroup: robin,
   bracketID: 0,
  }
  return roundJSON;
 }
 singleElim(data: BracketData) {
  let bracket: Match[][] = [];

  //Makes it an even amount of teams
  if (data.team.length % 2 == 1) {
   data.team.push({
    id: data.team.length,
    name: `qwertyasdfghzxcvbn$123`,
    seed: data.team.length + 1,
    eliminated: false,
    groupOne: {},
    groupTwo: {},
   });
  }

  //Checks if it is a perfect bracket
  let divTwo = this.isPrime(data);
  //Add Dummy's to end of bracket
  while (!divTwo) {
   data.team.push({
    id: data.team.length,
    name: `qwertyasdfghzxcvbn$123`,
    seed: data.team.length + 1,
    eliminated: false,
    groupOne: {},
    groupTwo: {},
   });
   divTwo = this.isPrime(data);
  }
  for (let i = 0; i < data.team.length; i++) {
   if (i == data.team.length - i) {
    break;
   }
   bracket.push([{ team1: data.team[i], team2: data.team[data.team.length - i - 1] }]);
  }
  let rounds = Math.log2(data.team.length);
  let matchesPerRound = data.team.length / 2;

  //Putting teams in the right order so #1 team plays #2 team at finals (if they both win)
  let highBracket = bracket.slice(0, matchesPerRound / 2);
  let lowBracket = bracket.slice(matchesPerRound / 2).reverse();
  let seededBracket: Match[][] = [];
  for (let i = 0; i < highBracket.length; i++) {
   seededBracket.push(highBracket[i]);
   seededBracket.push(lowBracket[i]);
  }
  let sortBracket = new Array;
  for (let j = 0; j <= matchesPerRound / 2 + 2; j += 2) {
   console.log(j);
   sortBracket.push([seededBracket[j], seededBracket[j + 1]]);
  }
  console.log(sortBracket);
  bracket = seededBracket;
  console.log(bracket);
  for (let r = 0; r < rounds; r++) {
   matchesPerRound = matchesPerRound / 2;
   let prevRound = bracket[r];
   for (let i = 0; i < matchesPerRound; i++) {
    let team: Team = {
     id: -1,
     name: `empty`,
     seed: -1,
     eliminated: false,
     groupOne: {},
     groupTwo: {},
    }
    let match: Match = { team1: team, team2: team };
    bracket.push([match]);
   }
  }
  return bracket;
 }
 doubleElim(data: BracketData) {
  let doubleJSON = {
   initialGroup: this.evenInitialMatch(data),
   bracketID: 0,
  }
  return doubleJSON;
 }
 isPrime(data: BracketData) {
  let isPrime = false;
  for (let i = data.team.length; i >= 2; i /= 2) {
   if (i === 2) {
    return true;
   }
  }
  return false;
 }
 evenInitialMatch(data: BracketData) {
  let single: Match[] = [];
  let j = data.teamAmount;
  for (let i = 1; i < data.teamAmount; i++) {
   if (i <= j) {
    let matchVar: Match = {
     team1: data.team[i - 1],
     team2: data.team[j],
    }
    single.push(matchVar);
    j--;
   } else {
    break;
   }
  }
  return single;
 }
}
