import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeriesService {

  constructor(private prismaService: PrismaService) {}

  private addImageUrls(series: any[]) {
    return series.map(serie => ({
      ...serie,
      imagenUrl: serie.imagen ? `${process.env.BASE_URL || 'http://localhost:4000'}${serie.imagen}` : null
    }));
  }

  async create(createSerieDto: CreateSerieDto, imagen?: Express.Multer.File) {
    // Verificar si ya existe una serie con el mismo nombre y temporada
    const existingSerie = await this.prismaService.series.findFirst({
      where: {
        nombre: createSerieDto.nombre,
        temporada: createSerieDto.temporada
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

    const { equiposId, ...data } = createSerieDto;
    const serie = await this.prismaService.series.create({
      data: {
        ...data,
        imagen: imagenPath
      },
      include: { equipos: true }
    });

    return this.addImageUrls([serie])[0];
  }

  async findAll() {
    const series = await this.prismaService.series.findMany({
      include: { equipos: true }
    });
    return this.addImageUrls(series);
  }

  async count() {
    return this.prismaService.series.count();
  }

  findLatest(limit: number = 3) {
    return this.prismaService.series.findMany({
      take: limit,
      orderBy: { createAt: 'desc' },
      include: { equipos: true }
    });
  }

  async findOne(id: number) {
    const serieFound = await this.prismaService.series.findUnique({
      where: { id },
      include: { equipos: true }
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

    const { equiposId, ...data } = updateSerieDto;
    const serieActualizada = await this.prismaService.series.update({
      where: { id },
      data: {
        ...data,
        ...(imagenPath && { imagen: imagenPath })
      },
      include: { equipos: true }
    });

    if (!serieActualizada) {
      throw new NotFoundException(`Serie con el id ${id}, no ha sido actualizada`);
    }

    return this.addImageUrls([serieActualizada])[0];
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