/**
 * Controller: Auth Controller
 * Handles authentication-related HTTP requests
 */

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserApplicationService } from '../../application/user/service/user.application-service';
import { CreateUserDto } from '../../application/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterUserCommand } from '../../application/user/command/register-user.command';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userApplicationService: UserApplicationService) {}

  /**
   * POST /api/auth/register
   * Register a new user and return JWT token
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    const command = new RegisterUserCommand(
      createUserDto.email,
      createUserDto.password,
      createUserDto.firstName,
      createUserDto.lastName,
    );

    const { user, token } = await this.userApplicationService.registerUser(command);

    return {
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email.value,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
        },
        token,
      },
    };
  }

  /**
   * POST /api/auth/login
   * Login user and return JWT token
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const { user, token } = await this.userApplicationService.loginUser(
      loginDto.email,
      loginDto.password,
    );

    return {
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email.value,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
      },
    };
  }
}
