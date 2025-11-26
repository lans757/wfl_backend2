import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SeriesService } from './series.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { FileUploadService } from '../common/file-upload.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen', FileUploadService.multerOptions))
  create(@Body() createSerieDto: CreateSerieDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.seriesService.create(createSerieDto, imagen);
  }

  @Get()
  findAll() {
    return this.seriesService.findAll();
  }

  @Get('count')
  count() {
    return this.seriesService.count();
  }

  @Get('latest')
  findLatest() {
    return this.seriesService.findLatest();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen', FileUploadService.multerOptions))
  update(@Param('id') id: string, @Body() updateSerieDto: UpdateSerieDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.seriesService.update(+id, updateSerieDto, imagen);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seriesService.remove(+id);
  }
}