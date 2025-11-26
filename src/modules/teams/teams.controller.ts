import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { FileUploadService } from '../common/file-upload.service';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen', FileUploadService.multerOptions))
  create(@Body() createEquipoDto: CreateEquipoDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.equiposService.create(createEquipoDto, imagen);
  }

  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Get('count')
  count() {
    return this.equiposService.count();
  }

  @Get('with-series')
  findAllWithSeries() {
    return this.equiposService.findAllWithSeries();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen', FileUploadService.multerOptions))
  update(@Param('id') id: string, @Body() updateEquipoDto: UpdateEquipoDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.equiposService.update(+id, updateEquipoDto, imagen);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposService.remove(+id);
  }
}