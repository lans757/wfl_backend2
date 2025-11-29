import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlayersService } from './players.service';
import { CreatePlayersDto } from './dto/create-players.dto';
import type { UpdatePlayersDto } from './dto/update-players.dto';
import { FileUploadService } from '../../common/file-upload.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen', FileUploadService.multerOptions))
  create(@Body() createPlayersDto: CreatePlayersDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.playersService.create(createPlayersDto, imagen);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get('count')
  count() {
    return this.playersService.count();
  }

  @Get('with-details')
  findAllWithDetails() {
    return this.playersService.findAllWithDetails();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen', FileUploadService.multerOptions))
  update(@Param('id') id: string, @Body() updatePlayersDto: UpdatePlayersDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.playersService.update(+id, updatePlayersDto, imagen);
  }

  @Patch(':id/imagen')
  @UseInterceptors(FileInterceptor('imagen', FileUploadService.multerOptions))
  updateImagen(@Param('id') id: string, @UploadedFile() imagen: Express.Multer.File) {
    return this.playersService.updateImagen(+id, imagen);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }

  @Post('import-excel')
  @UseInterceptors(FileInterceptor('file'))
  async importFromExcel(@UploadedFile() file: Express.Multer.File) {
    return this.playersService.importFromExcel(file.buffer);
  }
}
