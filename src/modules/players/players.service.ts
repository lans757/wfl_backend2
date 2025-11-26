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
    const players = await this.prismaService.players.findMany({
      include: {
        team: {
          include: {
            series: true
          }
        }
      }
    });
    return this.addImageUrls(players);
  }

  async count() {
    return this.prismaService.players.count();
  }

  async findAllWithDetails() {
    const players = await this.prismaService.players.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        team: {
          include: {
            series: true
          }
        }
      }
    });
    return this.addImageUrls(players);
  }

  private addImageUrls(players: any[]) {
    return players.map(player => ({
      ...player,
      imageUrl: player.image ? `${process.env.BASE_URL || 'http://localhost:4000'}${player.image}` : null
    }));
  }

  async findOne(id: number) {
    const playerFound = await this.prismaService.players.findUnique(
      {
        where: { id },
        select: {
          id: true,
          name: true,
          jerseyNumber: true,
          position: true,
          birthDate: true,
          nationality: true,
          description: true,
          height: true,
          weight: true,
          secondaryPosition1: true,
          secondaryPosition2: true,
          rarity: true,
          createdAt: true,
          updatedAt: true,
          teamId: true,
          // Excluimos team e image de la respuesta
        }
      }
    );

    if (!playerFound) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return playerFound;
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
        dataToUpdate.image = imagenPath;
      }

      const playerUpdated = await this.prismaService.players.update({
        where: { id },
        data: dataToUpdate
      });

      if (!playerUpdated) {
        throw new NotFoundException(`Player with id ${id} not updated`);
      }
      return playerUpdated;
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

      const player = await this.prismaService.players.update({
        where: { id },
        data: { image: imagenPath },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });

      return player;
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
    const playerRemove = await this.prismaService.players.delete({
      where:{id}
    })
    if (!playerRemove){
      throw new NotFoundException(`Player with id ${id} not deleted`);
    }
    return playerRemove;
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

      const players = data.map((row: any) => ({
        name: row['Name'],
        jerseyNumber: '1', // Valor por defecto como string
        position: row['Main position'],
        birthDate: new Date(row['Birthdate']),
        nationality: row['Nationality'],
        description: '', // Valor por defecto
        height: parseFloat(row['Height']),
        weight: parseFloat(row['Weight']),
        secondaryPosition1: row['Secondary position 1'] || null,
        secondaryPosition2: row['Secondary position 2'] || null,
        rarity: row['Rarity'],
        teamId: null, // Valor por defecto
      }));

      return this.prismaService.players.createMany({ data: players });
    } catch (error) {
      throw new Error('No se pudo cargar el archivo porque no cumple con los parámetros de carga');
    }
  }
}
