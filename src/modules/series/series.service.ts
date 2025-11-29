import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateSerieDto } from './dto/create-series.dto';
import { UpdateSerieDto } from './dto/update-series.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeriesService {

  constructor(private prismaService: PrismaService) {}


  async create(createSerieDto: CreateSerieDto, imagen?: Express.Multer.File) {
    // Verificar si ya existe una serie con el mismo nombre y temporada
    const existingSerie = await this.prismaService.series.findFirst({
      where: {
        name: createSerieDto.nombre,
        season: createSerieDto.temporada
      }
    });

    if (existingSerie) {
      throw new ConflictException('Ya existe una serie con el mismo nombre y temporada');
    }

    let imagenPath: string | undefined;

    if (imagen) {
      // Multer ya guardó el archivo, usar el filename generado
      imagenPath = `/uploads/${imagen.filename}`;
    }

    const serie = await this.prismaService.series.create({
      data: {
        name: createSerieDto.nombre,
        season: createSerieDto.temporada,
        description: createSerieDto.descripcion,
        status: createSerieDto.estado,
        country: createSerieDto.pais,
        launchDate: createSerieDto.fechaLanzamiento ? new Date(createSerieDto.fechaLanzamiento) : undefined,
        imagen: imagenPath
      },
      include: { teams: true }
    });

    return serie;
  }

  async findAll() {
    return await this.prismaService.series.findMany({
      include: { teams: true }
    });
  }

  async count() {
    return this.prismaService.series.count();
  }

  findLatest(limit: number = 3) {
    return this.prismaService.series.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { teams: true }
    });
  }

  async findOne(id: number) {
    const serieFound = await this.prismaService.series.findUnique({
      where: { id },
      include: { teams: true }
    });

    if (!serieFound) {
      throw new NotFoundException(`Serie con el id ${id}, no ha sido encontrada`);
    }
    return serieFound;
  }

  async update(id: number, updateSerieDto: UpdateSerieDto, imagen?: Express.Multer.File) {
    let imagenPath: string | undefined;

    if (imagen) {
      // Multer ya guardó el archivo, usar el filename generado
      imagenPath = `/uploads/${imagen.filename}`;
    }

    const serieActualizada = await this.prismaService.series.update({
      where: { id },
      data: {
        name: updateSerieDto.nombre,
        season: updateSerieDto.temporada,
        description: updateSerieDto.descripcion,
        status: updateSerieDto.estado,
        country: updateSerieDto.pais,
        launchDate: updateSerieDto.fechaLanzamiento ? new Date(updateSerieDto.fechaLanzamiento) : undefined,
        ...(imagenPath && { imagen: imagenPath })
      },
      include: { teams: true }
    });

    if (!serieActualizada) {
      throw new NotFoundException(`Serie con el id ${id}, no ha sido actualizada`);
    }

    return serieActualizada;
  }

  async remove(id: number) {
    const serieRemove = await this.prismaService.series.delete({
      where: { id }
    });

    if (!serieRemove) {
      throw new NotFoundException(`Serie con el id ${id}, no ha sido eliminada`);
    }

    return serieRemove;
  }
}