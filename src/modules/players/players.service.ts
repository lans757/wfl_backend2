import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePlayersDto } from './dto/create-players.dto';
import { UpdatePlayersDto } from './dto/update-players.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as XLSX from 'xlsx';

@Injectable()
export class PlayersService {

  constructor(private prismaService: PrismaService){}

  async create(createPlayersDto: CreatePlayersDto, imagen?: Express.Multer.File) {
    try {
      let imagenPath: string | undefined;

      if (imagen) {
        // Multer ya guardó el archivo, usar el filename generado
        imagenPath = `/uploads/${imagen.filename}`;
      }

      return await this.prismaService.players.create({
        data: {
          name: createPlayersDto.nombre,
          jerseyNumber: createPlayersDto.numeroCamiseta,
          position: createPlayersDto.posicion,
          birthDate: createPlayersDto.fechaNacimiento,
          nationality: createPlayersDto.nacionalidad,
          description: createPlayersDto.descripcion,
          teamId: createPlayersDto.equipoId,
          height: createPlayersDto.estatura,
          weight: createPlayersDto.peso,
          secondaryPosition1: createPlayersDto.posicionSecundaria1,
          secondaryPosition2: createPlayersDto.posicionSecundaria2,
          rarity: createPlayersDto.rareza,
          image: imagenPath
        }
      });
    } catch (error) {
      console.error('Error creando jugador:', error);
      throw new HttpException(
        {
          error: 'ERR_001',
          message: 'Error interno del servidor al crear el jugador',
          details: 'Ocurrió un error inesperado durante la creación del jugador'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll() {
    const jugadores = await this.prismaService.jugadores.findMany({
      include: {
        equipo: {
          include: {
            serie: true
          }
        }
      }
    });
    return this.addImageUrls(jugadores);
  }

  async count() {
    return this.prismaService.jugadores.count();
  }

  async findAllWithDetails() {
    const jugadores = await this.prismaService.jugadores.findMany({
      orderBy: { createAt: 'desc' },
      include: {
        equipo: {
          include: {
            serie: true
          }
        }
      }
    });
    return this.addImageUrls(jugadores);
  }

  private addImageUrls(jugadores: any[]) {
    return jugadores.map(jugador => ({
      ...jugador,
      imagenUrl: jugador.imagen ? `${process.env.BASE_URL || 'http://localhost:4000'}${jugador.imagen}` : null
    }));
  }

  async findOne(id: number) {
    const jugadorFound = await this.prismaService.jugadores.findUnique(
      {
        where: { id },
        select: {
          id: true,
          nombre: true,
          numeroCamiseta: true,
          posicion: true,
          fechaNacimiento: true,
          nacionalidad: true,
          descripcion: true,
          estatura: true,
          peso: true,
          posicionSecundaria1: true,
          posicionSecundaria2: true,
          rareza: true,
          createAt: true,
          updateAt: true,
          equipoId: true,
          // Excluimos equipo e imagen de la respuesta
        }
      }
    );

    if (!jugadorFound) {
      throw new NotFoundException(`Jugador con el id ${id}, no ha sido encontrado`);
    }
    return jugadorFound;
  }

  async update(id: number, updatePlayersDto: UpdatePlayersDto, imagen?: Express.Multer.File) {
    try {
      let imagenPath: string | undefined;

      if (imagen) {
        // Multer ya guardó el archivo, usar el filename generado
        imagenPath = `/uploads/${imagen.filename}`;
      }

      // Convertir campos numéricos de strings a números
      const dataToUpdate: any = { ...updatePlayersDto };

      if (dataToUpdate.estatura !== undefined && dataToUpdate.estatura !== null && dataToUpdate.estatura !== '') {
        dataToUpdate.estatura = parseFloat(dataToUpdate.estatura);
      } else {
        dataToUpdate.estatura = null;
      }

      if (dataToUpdate.peso !== undefined && dataToUpdate.peso !== null && dataToUpdate.peso !== '') {
        dataToUpdate.peso = parseFloat(dataToUpdate.peso);
      } else {
        dataToUpdate.peso = null;
      }

      if (dataToUpdate.equipoId !== undefined && dataToUpdate.equipoId !== null && dataToUpdate.equipoId !== '') {
        dataToUpdate.equipoId = parseInt(dataToUpdate.equipoId);
      } else {
        dataToUpdate.equipoId = null;
      }

      if (imagenPath) {
        dataToUpdate.imagen = imagenPath;
      }

      const jugadoractualizado = await this.prismaService.jugadores.update({
        where: { id },
        data: dataToUpdate
      });

      if (!jugadoractualizado) {
        throw new NotFoundException(`Jugador con el id ${id}, no ha sido Actualizado`);
      }
      return jugadoractualizado;
    } catch (error) {
      console.error('Error actualizando jugador:', error);
      throw new HttpException(
        {
          error: 'ERR_002',
          message: 'Error interno del servidor al actualizar el jugador',
          details: 'Ocurrió un error inesperado durante la actualización del jugador'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateImagen(id: number, imagen: Express.Multer.File) {
    try {
      // Validar que se proporcionó una imagen
      if (!imagen || !imagen.filename) {
        throw new HttpException(
          {
            error: 'ERR_004',
            message: 'No se proporcionó una imagen válida',
            details: 'Debe enviar un archivo de imagen en el campo "imagen"'
          },
          HttpStatus.BAD_REQUEST
        );
      }

      const imagenPath = `/uploads/${imagen.filename}`;

      const jugador = await this.prismaService.jugadores.update({
        where: { id },
        data: { imagen: imagenPath },
        select: {
          id: true,
          nombre: true,
          imagen: true,
        },
      });

      return jugador;
    } catch (error) {
      // Si es un error de Prisma (jugador no encontrado)
      if (error.code === 'P2025') {
        throw new NotFoundException(`Jugador con el id ${id}, no ha sido encontrado`);
      }

      // Si ya lanzamos HttpException, no la envolvemos
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('Error actualizando imagen del jugador:', error);
      throw new HttpException(
        {
          error: 'ERR_003',
          message: 'Error interno del servidor al actualizar la imagen del jugador',
          details: 'Ocurrió un error inesperado durante la actualización de la imagen'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number) {
    const jugadorRemove = await this.prismaService.jugadores.delete({
      where:{id}
    })
    if (!jugadorRemove){
      throw new NotFoundException(`Jugador con el id ${id}, no ha sido Eliminado`);
    }
    return jugadorRemove;
  }

  async importFromExcel(buffer: Buffer) {
    try {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const requiredFields = ['Name', 'Birthdate', 'Height', 'Weight', 'Main position', 'Nationality', 'Rarity'];

      for (const row of data) {
        for (const field of requiredFields) {
          if (!(row as any)[field] || (row as any)[field] === '') {
            throw new Error('Archivo no válido');
          }
        }
      }

      const jugadores = data.map((row: any) => ({
        nombre: row['Name'],
        numeroCamiseta: '1', // Valor por defecto como string
        posicion: row['Main position'],
        fechaNacimiento: new Date(row['Birthdate']),
        nacionalidad: row['Nationality'],
        descripcion: '', // Valor por defecto
        estatura: parseFloat(row['Height']),
        peso: parseFloat(row['Weight']),
        posicionSecundaria1: row['Secondary position 1'] || null,
        posicionSecundaria2: row['Secondary position 2'] || null,
        rareza: row['Rarity'],
        equipoId: null, // Valor por defecto
      }));

      return this.prismaService.jugadores.createMany({ data: jugadores });
    } catch (error) {
      throw new Error('No se pudo cargar el archivo porque no cumple con los parámetros de carga');
    }
  }
}
