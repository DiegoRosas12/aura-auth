import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserApplicationService } from '../../application/user/service/user.application-service';
import { CreateUserDto } from '../../application/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userApplicationService: UserApplicationService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    const { user, token } = await this.userApplicationService.registerUser(createUserDto);

    return {
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
        },
        token,
      },
    };
  }

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
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
      },
    };
  }
}
