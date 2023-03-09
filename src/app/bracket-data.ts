import { Team } from "./team";
/**
 * teamAmount (number): the amount of teams in the bracket
 * team (JSON): Contains the data for teams (name, id, seed, wins, losses)
 * formatAmount (number): the number of format(s)
 * format (array): the format(s) used
 * roundTwo (number): the amount of teams going to round two
 * group (number): the amount of teams in each group
 */
export interface BracketData {
 teamAmount: number,
 team: Array<Team>,
 formatAmount: number,
 format: Array<String>,
 amountRoundTwo: number,
 group: number,
 roundOne: {},
 roundTwo: {},
}
