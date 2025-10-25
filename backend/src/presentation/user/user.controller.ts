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
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../infrastructure/user/security/jwt.guard';
import { UserApplicationService } from '../../application/user/service/user.application-service';
import { UpdateUserDto } from '../../application/user/dto/update-user.dto';
import { GetUserProfileQuery } from '../../application/user/query/get-user-profile.query';
import { UpdateUserProfileCommand } from '../../application/user/command/update-user-profile.command';
import { ListUsersQuery } from '../../application/user/query/list-users.query';

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
    const query = new GetUserProfileQuery(req.user.userId);
    const user = await this.userApplicationService.getUserProfile(query);

    return {
      message: 'Profile retrieved successfully',
      data: {
        id: user.id,
        email: user.email.value,
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
    const command = new UpdateUserProfileCommand(
      req.user.userId,
      updateUserDto.email,
      updateUserDto.firstName,
      updateUserDto.lastName,
    );

    const user = await this.userApplicationService.updateUserProfile(command);

    return {
      message: 'Profile updated successfully',
      data: {
        id: user.id,
        email: user.email.value,
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
  async listUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    const query = new ListUsersQuery(page, limit);
    const users = await this.userApplicationService.listUsers(query);

    return {
      message: 'Users retrieved successfully',
      data: users.map((user) => ({
        id: user.id,
        email: user.email.value,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      })),
    };
  }
}
