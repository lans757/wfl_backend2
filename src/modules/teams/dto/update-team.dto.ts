import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

/**
 * DTO (Data Transfer Object) para la actualización parcial de equipos.
 * Todos los campos son opcionales para permitir actualizaciones parciales.
 */
export class UpdateTeamDto {
  /**
   * Team name. Optional.
   * @example "Club Atlético de Madrid"
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * Stadium name. Optional.
   * @example "Cívitas Metropolitano"
   */
  @IsString()
  @IsOptional()
  stadium?: string;

  /**
   * City. Optional.
   * @example "Madrid"
   */
  @IsString()
  @IsOptional()
  city?: string;

  /**
   * Description. Optional.
   * @example "Historic team with multiple titles"
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * Series ID. Optional.
   * @example 1
   */
  @IsNumber()
  @IsOptional()
  seriesId?: number;

  /**
   * Image URL. Optional.
   * @example "/uploads/team-logo.jpg"
   */
  @IsString()
  @IsOptional()
  image?: string;
}