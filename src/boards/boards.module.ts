import { Module } from '@nestjs/common';
import { BoardController } from './boards.controller';
import { BoardService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
