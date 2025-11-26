import { Team } from '../../teams/entities/team.entity';

export class Player {
  id: number;
  name: string;
  jerseyNumber: string;
  position: string;
  birthDate?: Date;
  nationality?: string;
  description?: string;
  height?: number;
  weight?: number;
  secondaryPosition1?: string;
  secondaryPosition2?: string;
  rarity?: string;
  image?: string;
  urlImage?: string;
  createdAt: Date;
  updatedAt: Date;
  teamId?: number;
  team?: Team;
}
