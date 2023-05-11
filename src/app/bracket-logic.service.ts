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
 private match: Match[] = [];
 constructor(public messageService: MessageService) { }
 createBracket(data: BracketData) {
  if (data.format[0] == 'Swiss') {
   //fix
   return this.swiss(data);
  } else if (data.format[0] == 'Group') {
   data.groupOrder = this.groups(data);
   return data;
  } else if (data.format[0] == 'Round Robin') {
   data.robinMatch = this.roundRobin(data);
   return data;
  } else if (data.format[0] == 'Single Elimination') {
   data.singleMatch = this.singleElim(data);
   return data
  } else if (data.format[0] == 'Double Elimination') {
   //fix
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

  //Sorts the numbers in the right order
  let sortRobin = [];
  for (let o = 0; o < robin.length; o++) {
   sortRobin.push(robin[o].sort((n1, n2) => n1 - n2));
  }

  //Creates the matches for each team.
  var matches: Match[][] = [];
  let round: Match[] = [];

  for (let row = 0; row < sortRobin.length; row++) {
   for (let team = 0; team < sortRobin[row].length; team++) {
    round.push({ team1: data.team[row], team2: data.team[sortRobin[row][team] - 1] });
   }
   round.splice(row, 0, { team1: data.team[row], team2: data.team[row], team1Score: 0, team2Score: 0 })
   matches.push(round);
   round = [];
  }
  return matches;
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
    wins: 0, loss: 0, tie: 0, groupOne: this.match, groupTwo: this.match
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
    wins: 0, loss: 0, tie: 0, groupOne: this.match, groupTwo: this.match
   });
   divTwo = this.isPrime(data);
  }
  //Makes round one in the correct order
  let roundOne: Match[] = [];
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
  //Add winner bracket
  let finalArr: Array<Match> = [];
  finalArr.push({ team1: null, team2: null })
  bracket.push(finalArr);
  data.singleMatch = bracket;
  return this.singleStart(data);
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
    wins: 0, loss: 0, tie: 0, groupOne: this.match, groupTwo: this.match
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
    wins: 0, loss: 0, tie: 0, groupOne: this.match, groupTwo: this.match
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

 singleStart(bracket: BracketData) {
  let match: Match;
  for (let i = 0; i < bracket.singleMatch.length; i++) {
   for (let j = 0; j < bracket.singleMatch[i].length; j++) {
    match = { team1: null, team2: null };;
    let k = bracket.singleMatch[i][j];
    let t = j - (j % 2);
    if (k?.team2?.name == 'qwertyasdfghzxcvbn$123') {
     match = this.singleUpdateMatchHigh(bracket, i, t, k);
    } else if (k?.team1?.name == 'qwertyasdfghzxcvbn$123') {
     //one bye team (higher)
     match = this.singleUpdateMatchLow(bracket, i, t, k);
    } else {
    }
    if (i != bracket.singleMatch.length - 1 && match.team1 != null) {
     bracket.singleMatch[i + 1][t / 2] = match;
    }
   }
  }
  return bracket.singleMatch;
 }

 singleUpdateMatchHigh(bracket: BracketData, i: number, t: number, k: Match) {
  let match: Match = { team1: null, team2: null };
  if (!bracket.singleMatch[i + 1][t / 2].team1?.name) {
   match = { team1: k.team1, team2: null };
  } else if (bracket.singleMatch[i + 1][t].team1?.name && bracket.singleMatch[i + 1][t / 2].team2?.name) {
   console.log('i broke chief')
  } else {
   match = { team1: bracket.singleMatch[i][t / 2].team1, team2: k.team1 };
  }
  return match;
 }
 singleUpdateMatchLow(bracket: BracketData, i: number, t: number, k: Match) {
  let match: Match = { team1: null, team2: null };
  try {
   if (!bracket.singleMatch[i + 1][t / 2].team1?.name) {
    match = { team1: k.team2, team2: null };
   } else if (bracket.singleMatch[i + 1][t].team1?.name && bracket.singleMatch[i + 1][t / 2].team2?.name) {
    console.log('i broke chief');
   } else {
    match = { team1: bracket.singleMatch[i + 1][t / 2].team1, team2: k.team2 };
   }
  } catch {
   return match;
  }
  return match;
 }
}
