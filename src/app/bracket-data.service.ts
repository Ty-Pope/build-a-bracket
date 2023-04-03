import { Injectable } from '@angular/core';
import { BracketData } from './bracket-data';
import { Match } from './match';
@Injectable({
 providedIn: 'root'
})
export class BracketDataService {

 constructor() { }
 private emptyMatch: Match[][] = []
 /*private bracket: BracketData = {
  teamAmount: 0,
  team: [],
  formatAmount: 0,
  format: [],
  amountRoundTwo: 0,
  group: 0,
  roundOne: this.emptyMatch,
  roundTwo: this.emptyMatch,
 };*/
 private bracket = JSON.parse('{"teamAmount":16,"team":[{"id":0,"name":"team 1","seed":1,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":1,"name":"team 2","seed":2,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":2,"name":"team 3","seed":3,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":3,"name":"team 4","seed":4,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":4,"name":"team 5","seed":5,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":5,"name":"team 6","seed":6,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":6,"name":"team 7","seed":7,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":7,"name":"team 8","seed":8,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":8,"name":"team 9","seed":9,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":9,"name":"team 10","seed":10,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":10,"name":"team 11","seed":11,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":11,"name":"team 12","seed":12,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":12,"name":"team 13","seed":13,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":13,"name":"team 14","seed":14,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":14,"name":"team 15","seed":15,"eliminated":false,"groupOne":[],"groupTwo":[]},{"id":15,"name":"team 16","seed":16,"eliminated":false,"groupOne":[],"groupTwo":[]}],"formatAmount":1,"format":["Double Elimination","",""],"amountRoundTwo":0,"group":0,"groupMatches":[],"roundOne":{"initialGroup":[{"team1":{"id":0,"name":"team 1","seed":1,"eliminated":false,"groupOne":[],"groupTwo":[]}},{"team1":{"id":1,"name":"team 2","seed":2,"eliminated":false,"groupOne":[],"groupTwo":[]},"team2":{"id":15,"name":"team 16","seed":16,"eliminated":false,"groupOne":[],"groupTwo":[]}},{"team1":{"id":2,"name":"team 3","seed":3,"eliminated":false,"groupOne":[],"groupTwo":[]},"team2":{"id":14,"name":"team 15","seed":15,"eliminated":false,"groupOne":[],"groupTwo":[]}},{"team1":{"id":3,"name":"team 4","seed":4,"eliminated":false,"groupOne":[],"groupTwo":[]},"team2":{"id":13,"name":"team 14","seed":14,"eliminated":false,"groupOne":[],"groupTwo":[]}},{"team1":{"id":4,"name":"team 5","seed":5,"eliminated":false,"groupOne":[],"groupTwo":[]},"team2":{"id":12,"name":"team 13","seed":13,"eliminated":false,"groupOne":[],"groupTwo":[]}},{"team1":{"id":5,"name":"team 6","seed":6,"eliminated":false,"groupOne":[],"groupTwo":[]},"team2":{"id":11,"name":"team 12","seed":12,"eliminated":false,"groupOne":[],"groupTwo":[]}},{"team1":{"id":6,"name":"team 7","seed":7,"eliminated":false,"groupOne":[],"groupTwo":[]},"team2":{"id":10,"name":"team 11","seed":11,"eliminated":false,"groupOne":[],"groupTwo":[]}},{"team1":{"id":7,"name":"team 8","seed":8,"eliminated":false,"groupOne":[],"groupTwo":[]},"team2":{"id":9,"name":"team 10","seed":10,"eliminated":false,"groupOne":[],"groupTwo":[]}}],"bracketID":0},"roundTwo":[]}');
 updateBracket(data: BracketData) {
  this.bracket = data;
 }
 getMatch() {
  return this.bracket;
 }
}
