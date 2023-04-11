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
 private bracket = JSON.parse('{"teamAmount":12,"team":[{"id":0,"name":"team 1","seed":1,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0},{"id":1,"name":"team 2","seed":2,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0},{"id":2,"name":"team 3","seed":3,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0},{"id":3,"name":"team 4","seed":4,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0},{"id":4,"name":"team 5","seed":5,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0},{"id":5,"name":"team 6","seed":6,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0},{"id":6,"name":"team 7","seed":7,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0},{"id":7,"name":"team 8","seed":8,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0},{"id":8,"name":"team 9","seed":9,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0},{"id":9,"name":"team 10","seed":10,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0},{"id":10,"name":"team 11","seed":11,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0},{"id":11,"name":"team 12","seed":12,"eliminated":false,"groupOne":[],"groupTwo":[],"wins":0,"loss":0,"tie":0}],"formatAmount":1,"format":["Group","",""],"amountRoundTwo":0,"group":3,"groupMatches":[[{"team1":1,"team2":4},{"team1":1,"team2":7},{"team1":1,"team2":10},{"team1":4,"team2":7},{"team1":4,"team2":10},{"team1":7,"team2":10}],[{"team1":2,"team2":5},{"team1":2,"team2":8},{"team1":2,"team2":11},{"team1":5,"team2":8},{"team1":5,"team2":11},{"team1":8,"team2":11}],[{"team1":3,"team2":6},{"team1":3,"team2":9},{"team1":3,"team2":12},{"team1":6,"team2":9},{"team1":6,"team2":12},{"team1":9,"team2":12}]],"roundOne":[[1,4,7,10],[2,5,8,11],[3,6,9,12]],"roundTwo":[]}');
 updateBracket(data: BracketData) {
  this.bracket = data;
 }
 getMatch() {
  return this.bracket;
 }
}
