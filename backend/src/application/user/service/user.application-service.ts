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
import { Password } from '../../../domain/user/value-object/password.vo';
import {
  UserRepository,
  USER_REPOSITORY,
} from '../../../domain/user/repository/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserApplicationService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<{ user: User; token: string }> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('The user already exists');
    }

    try {
      const plainPassword = Password.createFromPlainText(dto.password);
      const hashedPasswordString = await bcrypt.hash(plainPassword.value, 10);
      const hashedPassword = Password.createFromHash(hashedPasswordString);
      const user = new User(uuidv4(), dto.email, hashedPassword, dto.firstName, dto.lastName);

      const savedUser = await this.userRepository.save(user);
      const token = this.generateToken(savedUser);

      return { user: savedUser, token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);

    return { user, token };
  }

  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUserProfile(userId: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email.toLowerCase().trim() !== user.email) {
      const existingUser = await this.userRepository.findByEmail(dto.email);
      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException('Email already in use');
      }
    }

    user.updateProfile(dto.firstName, dto.lastName, dto.email);

    return await this.userRepository.save(user);
  }

  async listUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
