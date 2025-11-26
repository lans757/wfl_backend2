import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber, // Importa IsNumber si usarás IDs numéricos
} from 'class-validator';

/**
 * DTO (Data Transfer Object) para la creación de nuevos equipos.
 * Define la estructura y reglas de validación para los datos de entrada.
 */
export class CreateEquipoDto {
  /**
   * Nombre oficial del equipo. Es obligatorio.
   * @example "Club Atlético de Madrid"
   */
  @IsString()
  @IsNotEmpty({ message: 'El nombre del equipo no puede estar vacío' })
  nombre: string;

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
   * ID de la serie a la que pertenece el equipo. Campo opcional.
   * @example 1
   */
  @IsNumber()
  @IsOptional()
  serieId?: number;

  /**
   * URL o ruta de la imagen del equipo. Campo opcional.
   * @example "/uploads/equipo-logo.jpg"
   */
  @IsString()
  @IsOptional()
  imagen?: string;

}