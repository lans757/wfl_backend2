import { Equipo } from '../../equipos/entities/equipo.entity';

export class Serie {
  id: number;
  nombre: string;
  temporada?: string;
  pais?: string;
  createAt: Date;
  updateAt: Date;
  equipos: Equipo[];
}