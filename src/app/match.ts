import { Team } from "./team";

export interface Match {
 team1: Team | null,
 team2: Team | null,
 team1Score?: number,
 team2Score?: number,
}
