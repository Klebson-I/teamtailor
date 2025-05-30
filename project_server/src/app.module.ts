import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamtailorModule } from './teamtailor/teamtailor.module';

@Module({
  imports: [TeamtailorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
