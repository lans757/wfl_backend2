import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EquiposService {

  constructor(private prismaService: PrismaService){}

  private addImageUrls(equipos: any[]) {
    return equipos.map(equipo => ({
      ...equipo,
      imagenUrl: equipo.imagen ? `${process.env.BASE_URL || 'http://localhost:4000'}${equipo.imagen}` : null
    }));
  }

  async create(createEquipoDto: CreateEquipoDto, imagen?: Express.Multer.File) {
    let imagenPath: string | undefined;

    if (imagen) {
      // Multer ya guardó el archivo, usar el filename generado
      imagenPath = `/uploads/${imagen.filename}`;
    }

    const { serieId, ...equipoData } = createEquipoDto;
    const equipo = await this.prismaService.equipos.create({
      data: {
        ...equipoData,
        imagen: imagenPath,
        ...(serieId && { serieId })
      },
      include: { serie: true, jugadores: true }
    });

    return this.addImageUrls([equipo])[0];
  }

  async findAll() {
    const equipos = await this.prismaService.equipos.findMany({
      include: {
        jugadores: true,
        serie: true
      }
    });
    return this.addImageUrls(equipos);
  }

  async count() {
    return this.prismaService.equipos.count();
  }

  findAllWithSeries() {
    return this.prismaService.equipos.findMany({
      include: {
        serie: true,
        jugadores: true
      }
    });
  }

  async findOne(id: number) {
    const equipoFound = await this.prismaService.equipos.findUnique({
      where: { id },
      include: { jugadores: true, serie: true }
    });

    if (!equipoFound) {
      throw new NotFoundException(`Equipo con el id ${id}, no ha sido encontrado`);
    }
    return equipoFound;
  }

  async update(id: number, updateEquipoDto: UpdateEquipoDto, imagen?: Express.Multer.File) {
    let imagenPath: string | undefined;

    if (imagen) {
      // Multer ya guardó el archivo, usar el filename generado
      imagenPath = `/uploads/${imagen.filename}`;
    }

    const dataToUpdate: any = { ...updateEquipoDto };
    if (imagenPath) {
      dataToUpdate.imagen = imagenPath;
    }

    const equipoActualizado = await this.prismaService.equipos.update({
      where: { id },
      data: dataToUpdate,
      include: { jugadores: true, serie: true }
    });

    if (!equipoActualizado) {
      throw new NotFoundException(`Equipo con el id ${id}, no ha sido Actualizado`);
    }

    return this.addImageUrls([equipoActualizado])[0];
  }

  async remove(id: number) {
    // Set equipoId to null for players in this equipo
    await this.prismaService.jugadores.updateMany({
      where: { equipoId: id },
      data: { equipoId: null }
    });

    const equipoRemove = await this.prismaService.equipos.delete({
      where: { id }
    });

    if (!equipoRemove) {
      throw new NotFoundException(`Equipo con el id ${id}, no ha sido Eliminado`);
    }

    return equipoRemove;
  }
}