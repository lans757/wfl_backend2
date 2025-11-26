import { Series } from '../../series/entities/series.entity';
import { Player } from '../../players/entities/player.entity';

export class Team {
  id: number;
  name: string;
  stadium?: string;
  city?: string;
  createdAt: Date;
  updatedAt: Date;
  players: Player[];
  series: Series[];
}