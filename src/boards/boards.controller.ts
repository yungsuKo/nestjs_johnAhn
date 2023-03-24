import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './boards.service';
import { Board } from './entities/boards.model';

@Controller('/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardService.getAllBoards();
  }
  @Post()
  createBoard(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Board {
    // 전달 받은 값을 받아오기 위해서는 어떻게 해야하는지 알야애함.
    // express에서는 req.body를 통해서 전달 받은 값을 가져왔었음.
    return this.boardService.createBoard(title, description);
  }
}
