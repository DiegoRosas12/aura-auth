/**
 * Controller: User Controller
 * Handles user-related HTTP requests (profile management, user listing)
 */

import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../infrastructure/user/security/jwt.guard';
import { UserApplicationService } from '../../application/user/service/user.application-service';
import { UpdateUserDto } from '../../application/user/dto/update-user.dto';

@Controller('api/users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userApplicationService: UserApplicationService) {}

  /**
   * GET /api/users/profile
   * Get current authenticated user profile
   */
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req) {
    const user = await this.userApplicationService.getUserProfile(req.user.userId);

    return {
      message: 'Profile retrieved successfully',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  /**
   * PUT /api/users/profile
   * Update current authenticated user profile
   */
  @Put('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userApplicationService.updateUserProfile(
      req.user.userId,
      updateUserDto,
    );

    return {
      message: 'Profile updated successfully',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        updatedAt: user.updatedAt,
      },
    };
  }

  /**
   * GET /api/users
   * List all users (authentication required)
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async listUsers() {
    const users = await this.userApplicationService.listUsers();

    return {
      message: 'Users retrieved successfully',
      data: users.map((user) => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      })),
    };
  }
}
