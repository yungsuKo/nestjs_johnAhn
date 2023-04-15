import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardStatus } from './boards.model';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    // 전달 받은 값을 받아오기 위해서는 어떻게 해야하는지 알야애함.
    // express에서는 req.body를 통해서 전달 받은 값을 가져왔었음.
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardService.deleteBoardById(id);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardService.updateBoardStatus(id, status);
  }
}
