import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [MulterModule.register({ dest: './uploads' }), CommonModule],
  controllers: [SeriesController],
  providers: [SeriesService, PrismaService],
})
export class SeriesModule {}