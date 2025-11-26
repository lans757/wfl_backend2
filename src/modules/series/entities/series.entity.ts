import { Team } from '../../teams/entities/team.entity';

export class Series {
  id: number;
  name: string;
  season?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
  teams: Team[];
}