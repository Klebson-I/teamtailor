import { Module } from '@nestjs/common';
import { TeamtailorController } from './teamtailor.controller';
import { TeamtailorService } from './teamtailor.service';
import { TeamtailorApiHandlerModule } from 'src/classes/TeamtailorApiHandler/TeamtailorApiHandler.module';

@Module({
  controllers: [TeamtailorController],
  providers: [TeamtailorService],
  imports: [TeamtailorApiHandlerModule]
})
export class TeamtailorModule {}
