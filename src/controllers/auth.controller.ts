import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: { username: string; userId: number } }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() createUserDto: { username: string; password: string }) {
    return this.authService.register(createUserDto);
  }
}
