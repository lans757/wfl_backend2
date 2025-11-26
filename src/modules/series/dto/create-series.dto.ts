import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
} from 'class-validator';

/**
 * DTO (Data Transfer Object) para la creación de nuevas Series (Ligas/Torneos).
 * Define la estructura y reglas de validación para los datos de entrada.
 */
export class CreateSerieDto {
  /**
   * Nombre oficial de la serie o liga. Es obligatorio.
   * @example "LaLiga EA Sports"
   */
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la serie no puede estar vacío' })
  nombre: string;

  /**
   * Temporada a la que corresponde la serie. Campo opcional.
   * @example "2024-2025"
   */
  @IsString()
  @IsOptional()
  temporada?: string;

  /**
   * Descripción detallada de la serie. Campo opcional.
   * @example "La liga más importante de fútbol español"
   */
  @IsString()
  @IsOptional()
  descripcion?: string;

  /**
   * Estado actual de la serie. Campo opcional.
   * @example "activa"
   */
  @IsString()
  @IsOptional()
  estado?: string;

  /**
   * País o región donde se juega la serie. Campo opcional.
   * @example "España"
   */
  @IsString()
  @IsOptional()
  pais?: string;

  /**
   * Fecha de lanzamiento de la serie. Campo opcional.
   * @example "2024-08-15"
   */
  @IsString()
  @IsOptional()
  fechaLanzamiento?: string;

  /**
   * Arreglo de IDs numéricos de los equipos que participan en esta serie.
   * Se valida que cada elemento del arreglo sea un número válido.
   * Es opcional para permitir crear una serie sin equipos asignados.
   * @example [1, 2]
   */
  @IsArray()
  @IsOptional()
  @IsNumber(
    {},
    {
      each: true, // Aplica la validación a CADA elemento del arreglo
      message: 'Cada ID de equipo debe ser un número válido',
    },
  )
  equiposId?: number[];

  /**
   * URL o ruta de la imagen de la serie. Campo opcional.
   * @example "/uploads/serie-logo.jpg"
   */
  @IsString()
  @IsOptional()
  imagen?: string;
}