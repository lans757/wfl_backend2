import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TeamsService {

  constructor(private prismaService: PrismaService){}

  private addImageUrls(teams: any[]) {
    return teams.map(team => ({
      ...team,
      imageUrl: team.image ? `${process.env.BASE_URL || 'http://localhost:4000'}${team.image}` : null
    }));
  }

  async create(createTeamDto: CreateTeamDto, imagen?: Express.Multer.File) {
    let imagenPath: string | undefined;

    if (imagen) {
      // Multer ya guardó el archivo, usar el filename generado
      imagenPath = `/uploads/${imagen.filename}`;
    }

    const { seriesId, ...teamData } = createTeamDto;
    const team = await this.prismaService.teams.create({
      data: {
        ...teamData,
        image: imagenPath,
        ...(seriesId && { seriesId })
      },
      include: { series: true, players: true }
    });

    return this.addImageUrls([team])[0];
  }

  async findAll() {
    const teams = await this.prismaService.teams.findMany({
      include: {
        players: true,
        series: true
      }
    });
    return this.addImageUrls(teams);
  }

  async count() {
    return this.prismaService.teams.count();
  }

  findAllWithSeries() {
    return this.prismaService.teams.findMany({
      include: {
        series: true,
        players: true
      }
    });
  }

  async findOne(id: number) {
    const teamFound = await this.prismaService.teams.findUnique({
      where: { id },
      include: { players: true, series: true }
    });

    if (!teamFound) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    return teamFound;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto, imagen?: Express.Multer.File) {
    let imagenPath: string | undefined;

    if (imagen) {
      // Multer ya guardó el archivo, usar el filename generado
      imagenPath = `/uploads/${imagen.filename}`;
    }

    const dataToUpdate: any = { ...updateTeamDto };
    if (imagenPath) {
      dataToUpdate.image = imagenPath;
    }

    const teamUpdated = await this.prismaService.teams.update({
      where: { id },
      data: dataToUpdate,
      include: { players: true, series: true }
    });

    if (!teamUpdated) {
      throw new NotFoundException(`Team with id ${id} not updated`);
    }

    return this.addImageUrls([teamUpdated])[0];
  }

  async remove(id: number) {
    // Set teamId to null for players in this team
    await this.prismaService.players.updateMany({
      where: { teamId: id },
      data: { teamId: null }
    });

    const teamRemove = await this.prismaService.teams.delete({
      where: { id }
    });

    if (!teamRemove) {
      throw new NotFoundException(`Team with id ${id} not deleted`);
    }

    return teamRemove;
  }
}