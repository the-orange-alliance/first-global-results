import {Event, ICompleteTeamResponse, Match, Ranking, Team} from "@the-orange-alliance/lib-ems/";

export interface IApplicationState {
  seasons: any[];
  teams: Team[];
  event: Event;
  matches: Match[];
  matchSize: number;
  rankings: Ranking[];
  completeMatch: Match;
  completeTeam: ICompleteTeamResponse;
}