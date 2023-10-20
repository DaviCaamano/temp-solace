import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from '~user/dto';
import { LoginResponse } from '#interfaces/user/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('login')
  async login(@Body() user: LoginDto): Promise<LoginResponse> {
    return this.authService.login(user);
  }
}
