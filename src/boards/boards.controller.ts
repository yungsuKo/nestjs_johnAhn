import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './entities/board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('/boards')
@UseGuards(AuthGuard())
export class BoardController {
  private logger = new Logger('BoardController');
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} is getting all boards`);
    return this.boardService.getAllBoards(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    // 전달 받은 값을 받아오기 위해서는 어떻게 해야하는지 알야애함.
    // express에서는 req.body를 통해서 전달 받은 값을 가져왔었음.
    this.logger.verbose(
      `User ${user.username} is creating a new board. 
      Data: ${JSON.stringify(createBoardDto)}`,
    );
    return await this.boardService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return await this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(
    @Param('id') id: number, //
    @GetUser() user: User,
  ): void {
    console.log('act');
    this.boardService.deleteBoardById(id, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardService.updateBoardStatus(id, status);
  }
}
