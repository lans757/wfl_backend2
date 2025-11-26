import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [MulterModule.register({ dest: './uploads' })],
  controllers: [EquiposController],
  providers: [EquiposService, PrismaService],
})
export class EquiposModule {}