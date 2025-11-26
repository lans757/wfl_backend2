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
export class CreateTeamDto {
  /**
   * Name of the team. Required.
   * @example "Club Atlético de Madrid"
   */
  @IsString()
  @IsNotEmpty({ message: 'Team name cannot be empty' })
  name: string;

  /**
   * Stadium name. Optional.
   * @example "Cívitas Metropolitano"
   */
  @IsString()
  @IsOptional()
  stadium?: string;

  /**
   * City of the team. Optional.
   * @example "Madrid"
   */
  @IsString()
  @IsOptional()
  city?: string;

  /**
   * Description of the team. Optional.
   * @example "Historic team with multiple titles"
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * Series ID the team belongs to. Optional.
   * @example 1
   */
  @IsNumber()
  @IsOptional()
  seriesId?: number;

  /**
   * Image URL or path. Optional.
   * @example "/uploads/team-logo.jpg"
   */
  @IsString()
  @IsOptional()
  image?: string;

}