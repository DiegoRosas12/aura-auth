/**
 * Application Service: User Application Service
 * Orchestrates use cases and coordinates between domain and infrastructure layers.
 * Contains application-specific business logic and workflows.
 */

import {
  Inject,
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../../domain/user/entity/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../../domain/user/repository/user.repository.interface';
import { PasswordValidator } from '../../../shared/utils/password-validator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserApplicationService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Use Case: Register a new user
   * Returns JWT token upon successful registration
   */
  async registerUser(dto: CreateUserDto): Promise<{ user: User; token: string }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('The user already exists');
    }

    // Validate password strength
    try {
      PasswordValidator.validate(dto.password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user domain entity
    const user = new User(
      uuidv4(),
      dto.email,
      hashedPassword,
      dto.firstName,
      dto.lastName,
    );

    // Persist user
    const savedUser = await this.userRepository.save(user);

    // Generate JWT token
    const token = this.generateToken(savedUser);

    return { user: savedUser, token };
  }

  /**
   * Use Case: Login user
   * Validates credentials and returns JWT token
   */
  async loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return { user, token };
  }

  /**
   * Use Case: Get user profile
   */
  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Use Case: Update user profile
   */
  async updateUserProfile(userId: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // If email is being changed, check if it's already taken
    if (dto.email && dto.email.toLowerCase().trim() !== user.email) {
      const existingUser = await this.userRepository.findByEmail(dto.email);
      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException('Email already in use');
      }
    }

    // Update user profile
    user.updateProfile(dto.firstName, dto.lastName, dto.email);

    // Persist changes
    return await this.userRepository.save(user);
  }

  /**
   * Use Case: List all users
   */
  async listUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  /**
   * Generates JWT token for authenticated user
   */
  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
