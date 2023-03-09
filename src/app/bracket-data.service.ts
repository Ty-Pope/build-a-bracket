import { Injectable } from '@angular/core';
import { Match } from './match';
@Injectable({
 providedIn: 'root'
})
export class BracketDataService {

 constructor() { }
 private match: Match[][] = [];
 updateMatch(data: Match[][]) {
  this.match = data;
 }
 getMatch() {
  return this.match;
 }
}
