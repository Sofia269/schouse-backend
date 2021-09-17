import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req) {
    return this.authService.generateJWT(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profile(@Req() req) {
    const user = req.user;
    console.log('token', user);
    return this.usersService.getUser(user?.userId);
  }
}
