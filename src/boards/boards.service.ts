import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './entities/boards.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardService {
  private boards: Board[] = [];
  getAllBoards(): Board[] {
    return this.boards;
  }
  createBoard(title: string, description: string): Board{
    const board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }
}
