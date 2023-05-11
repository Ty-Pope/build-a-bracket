import { Match } from "./match";

export interface Team {
 id: number,
 name: string,
 seed?: number,
 eliminated?: boolean,
 wins: number,
 loss: number,
 tie: number,
 groupOne: Match[],
 groupTwo: Match[],
}
