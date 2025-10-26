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
import { Email } from '../../../domain/user/value-object/email.vo';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../../domain/user/repository/user.repository.interface';
import { UserDomainService } from '../../../domain/user/service/user.domain-service';

import { RegisterUserCommand } from '../command/register-user.command';
import { UpdateUserProfileCommand } from '../command/update-user-profile.command';
import { GetUserProfileQuery } from '../query/get-user-profile.query';
import { ListUsersQuery } from '../query/list-users.query';

@Injectable()
export class UserApplicationService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly userDomainService: UserDomainService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Use Case: Register a new user
   * Returns JWT token upon successful registration
   */
  async registerUser(command: RegisterUserCommand): Promise<{ user: User; token: string }> {
    const email = new Email(command.email);

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    try {
      this.userDomainService.validateUniqueEmail(existingUser, email);
    } catch (error) {
      throw new BadRequestException('The user already exists');
    }

    // Validate password strength
    try {
      this.userDomainService.validatePasswordStrength(command.password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(command.password, 10);

    // Create user domain entity
    const user = this.userDomainService.createUser(
      uuidv4(),
      email,
      hashedPassword,
      command.firstName,
      command.lastName,
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
    const emailVO = new Email(email);
    const user = await this.userRepository.findByEmail(emailVO);

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
  async getUserProfile(query: GetUserProfileQuery): Promise<User> {
    const user = await this.userRepository.findById(query.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Use Case: Update user profile
   */
  async updateUserProfile(command: UpdateUserProfileCommand): Promise<User> {
    const user = await this.userRepository.findById(command.userId);
    this.userDomainService.validateProfileUpdate(user);

    const emailVO = command.email ? new Email(command.email) : undefined;

    // If email is being changed, check if it's already taken
    if (emailVO && !emailVO.equals(user.email)) {
      const existingUser = await this.userRepository.findByEmail(emailVO);
      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException('Email already in use');
      }
    }

    // Update user profile
    user.updateProfile(command.firstName, command.lastName, emailVO);

    // Persist changes
    return await this.userRepository.save(user);
  }

  /**
   * Use Case: List all users
   */
  async listUsers(query: ListUsersQuery): Promise<User[]> {
    return await this.userRepository.findAll(query);
  }

  /**
   * Generates JWT token for authenticated user
   */
  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email.value,
    };

    return this.jwtService.sign(payload);
  }
}
