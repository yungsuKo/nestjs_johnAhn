import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardController } from './boards/boards.controller';
import { BoardService } from './boards/boards.service';

@Module({
  imports: [],
  controllers: [AppController, BoardController],
  providers: [AppService, BoardService],
})
export class AppModule {}
