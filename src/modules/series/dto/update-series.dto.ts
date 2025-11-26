import { PartialType } from '@nestjs/mapped-types';
import { CreateSerieDto } from './create-serie.dto';

/**
 * DTO (Data Transfer Object) para la actualización parcial de Series.
 * Hereda todas las propiedades de 'CreateSerieDto' y las hace opcionales.
 * Permite actualizar solo los campos deseados.
 */
export class UpdateSerieDto extends PartialType(CreateSerieDto) {}