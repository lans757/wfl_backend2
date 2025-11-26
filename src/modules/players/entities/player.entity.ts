import { Equipo } from '../../equipos/entities/equipo.entity';

export class Jugador {
  id: number;
  nombre: string;
  numeroCamiseta: string;
  posicion: string;
  fechaNacimiento?: Date;
  nacionalidad?: string;
  descripcion?: string;
  estatura?: number;
  peso?: number;
  posicionSecundaria1?: string;
  posicionSecundaria2?: string;
  rareza?: string;
  imagen?: string;
  url_image?: string;
  createAt: Date;
  updateAt: Date;
  equipoId?: number;
  equipo?: Equipo;
}
