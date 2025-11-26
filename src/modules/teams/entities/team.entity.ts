import { Serie } from '../../series/entities/serie.entity';
import { Jugador } from '../../jugadores/entities/jugadore.entity';

export class Equipo {
  id: number;
  nombre: string;
  estadio?: string;
  ciudad?: string;
  createAt: Date;
  updateAt: Date;
  jugadores: Jugador[];
  series: Serie[];
}