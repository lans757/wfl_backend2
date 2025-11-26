import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [MulterModule.register({ dest: './uploads' })],
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService],
})
export class TeamsModule {}