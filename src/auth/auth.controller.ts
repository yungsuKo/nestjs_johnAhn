import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return await this.authService.createUser(authCredentialDto);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return await this.authService.signIn(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  test(@GetUser() user: User) {
    console.log(user);
  }
}
