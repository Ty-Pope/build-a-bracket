import { Injectable } from '@angular/core';
import { BracketData } from './bracket-data';
import { Match } from './match';
@Injectable({
 providedIn: 'root'
})
export class BracketDataService {

 constructor() { }
 private emptyMatch: Match[][] = []
 private bracket: BracketData = {
  teamAmount: 0,
  team: [],
  formatAmount: 0,
  format: [],
  amountRoundTwo: 0,
  group: 0,
  groupMatches: this.emptyMatch,
  roundOne: this.emptyMatch,
  roundTwo: this.emptyMatch,
 };
 //private bracket = JSON.parse('{}');
 updateBracket(data: BracketData) {
  this.bracket = data;
 }
 getMatch() {
  return this.bracket;
 }
}
