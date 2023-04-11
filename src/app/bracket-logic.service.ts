import { Injectable } from '@angular/core';
import { Team } from './team';
import { BracketData } from './bracket-data';
import { MessageService } from './message.service';
import { Match } from './match';
import { Data } from '@angular/router';
import { map } from 'rxjs';

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
  return this.evenInitialMatch(data);
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
  return groupArr;
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
  return robin;
 }
 singleElim(data: BracketData) {
  //Gets the order that the teams should be in.
  let order = this.singleElimSeed(data);
  console.log(order);
  let bracket: Match[][] = [];

  //Makes it an even amount of teams
  if (data.team.length % 2 == 1) {
   data.team.push({
    id: data.team.length,
    name: `qwertyasdfghzxcvbn$123`,
    seed: data.team.length + 1,
    eliminated: false,
    wins: 0, loss: 0, tie: 0,
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
    wins: 0, loss: 0, tie: 0,
   });
   divTwo = this.isPrime(data);
  }
  //Makes round one in the correct order
  let roundOne = [];
  for (let i = 0; i < order.length; i++) {
   roundOne.push({ team1: data.team[order[i] - 1], team2: data.team[order[i + 1] - 1] });
   i++;
  }
  bracket.push(roundOne);
  let matchesPerRound = data.team.length / 4;
  while (matchesPerRound > 1) {
   let arr = new Array<Match>(matchesPerRound);
   for (let j = 0; j < arr.length; j++) {
    arr[j] = { team1: null, team2: null };
   }
   bracket.push(arr);
   matchesPerRound /= 2;
  }

  return bracket;
 }
 //TODO Only has single elim matches
 doubleElim(data: BracketData) {
  //Gets the order that the teams should be in.
  let order = this.singleElimSeed(data);
  console.log(order);
  let bracket: Match[][] = [];

  //Makes it an even amount of teams
  if (data.team.length % 2 == 1) {
   data.team.push({
    id: data.team.length,
    name: `qwertyasdfghzxcvbn$123`,
    seed: data.team.length + 1,
    eliminated: false,
    wins: 0, loss: 0, tie: 0,
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
    wins: 0, loss: 0, tie: 0,
   });
   divTwo = this.isPrime(data);
  }
  //Makes round one in the correct order
  let roundOne = [];
  for (let i = 0; i < order.length; i++) {
   roundOne.push({ team1: data.team[order[i] - 1], team2: data.team[order[i + 1] - 1] });
   i++;
  }
  bracket.push(roundOne);
  let matchesPerRound = data.team.length / 4;
  while (matchesPerRound > 1) {
   let arr = new Array<Match>(matchesPerRound);
   for (let j = 0; j < arr.length; j++) {
    arr[j] = { team1: null, team2: null };
   }
   bracket.push(arr);
   matchesPerRound /= 2;
  }

  return bracket;
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
 singleElimSeed(data: BracketData) {
  let seeds = [1];
  while (seeds.length < data.teamAmount) {
   let games = seeds.map(seed => [seed, 2 * seeds.length + 1 - seed]);
   seeds = games.flat();
  }
  return seeds;
 }
}
