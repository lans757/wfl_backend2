import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [MulterModule.register({ dest: './uploads' })],
  controllers: [SeriesController],
  providers: [SeriesService, PrismaService],
})
export class SeriesModule {}