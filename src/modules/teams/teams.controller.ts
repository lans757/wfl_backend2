import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { FileUploadService } from '../../common/file-upload.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen', FileUploadService.multerOptions))
  create(@Body() createTeamDto: CreateTeamDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.teamsService.create(createTeamDto, imagen);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get('count')
  count() {
    return this.teamsService.count();
  }

  @Get('with-series')
  findAllWithSeries() {
    return this.teamsService.findAllWithSeries();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen', FileUploadService.multerOptions))
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.teamsService.update(+id, updateTeamDto, imagen);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}