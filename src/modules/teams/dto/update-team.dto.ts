import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

/**
 * DTO (Data Transfer Object) para la actualización parcial de equipos.
 * Todos los campos son opcionales para permitir actualizaciones parciales.
 */
export class UpdateEquipoDto {
  /**
   * Nombre oficial del equipo. Campo opcional.
   * @example "Club Atlético de Madrid"
   */
  @IsString()
  @IsOptional()
  nombre?: string;

  /**
   * Nombre del estadio principal del equipo. Campo opcional.
   * @example "Cívitas Metropolitano"
   */
  @IsString()
  @IsOptional()
  estadio?: string;

  /**
   * Ciudad de origen del equipo. Campo opcional.
   * @example "Madrid"
   */
  @IsString()
  @IsOptional()
  ciudad?: string;

  /**
   * Descripción del equipo. Campo opcional.
   * @example "Equipo histórico con múltiples títulos"
   */
  @IsString()
  @IsOptional()
  descripcion?: string;

  /**
   * ID de la serie a la que pertenece el equipo. Campo opcional para actualizaciones.
   * @example 1
   */
  @IsNumber()
  @IsOptional()
  serieId?: number;

  /**
   * URL o ruta de la imagen del equipo. Campo opcional para actualizaciones.
   * @example "/uploads/equipo-logo.jpg"
   */
  @IsString()
  @IsOptional()
  imagen?: string;
}