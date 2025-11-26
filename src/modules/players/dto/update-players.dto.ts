import { IsNotEmpty, IsString, IsIn, IsOptional, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

// ⚠️ NOTA: Este DTO es para actualizaciones, por lo que todos los campos son opcionales.
// Los campos que se envíen serán validados según las reglas del CreateJugadoresDto.

export class UpdatePlayersDto {

  // --- Campos Esenciales de Jugador ---

  @IsString()
  @IsOptional()
  readonly nombre?: string;

  @IsString()
  @IsOptional()
  readonly numeroCamiseta?: string;

  // Limita las opciones de posición para asegurar la consistencia de los datos
  @IsString()
  @IsOptional()
  @IsIn(['Portero', 'Defensa', 'Mediocampista', 'Delantero', 'Reservas'], {
    message: 'La posición debe ser: Portero, Defensa, Mediocampista, Delantero o Reservas.',
  })
  readonly posicion?: string;

  // --- Campos Adicionales Sugeridos ---

  // Se espera que la fecha llegue como una cadena en formato ISO (Ej: "2000-01-20")
  @IsDate({ message: 'La fecha de nacimiento debe tener un formato de fecha válido.' })
  @Type(() => Date)
  @IsOptional()
  readonly fechaNacimiento?: Date;

  @IsString()
  @IsOptional()
  readonly nacionalidad?: string;

  // Puedes usar este campo para un breve comentario o descripción del perfil
  @IsString()
  @IsOptional()
  readonly descripcion?: string;

  @IsInt({ message: 'El ID del equipo debe ser un número entero.' })
  @IsOptional()
  @Type(() => Number)
  readonly equipoId?: number;

  // --- Campos para el sistema de cartas coleccionables ---

  @IsOptional()
  @Type(() => Number)
  readonly estatura?: number;

  @IsOptional()
  @Type(() => Number)
  readonly peso?: number;

  @IsString()
  @IsOptional()
  readonly posicionSecundaria1?: string;

  @IsString()
  @IsOptional()
  readonly posicionSecundaria2?: string;

  @IsString()
  @IsOptional()
  readonly rareza?: string;

  @IsString()
  @IsOptional()
  readonly imagen?: string;
}