import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import {
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserApplicationService } from '../../../../../src/application/user/service/user.application-service';
import {
  UserRepository,
  USER_REPOSITORY,
} from '../../../../../src/domain/user/repository/user.repository.interface';
import { User } from '../../../../../src/domain/user/entity/user.entity';
import { Password } from '../../../../../src/domain/user/value-object/password.vo';
import { CreateUserDto } from '../../../../../src/application/user/dto/create-user.dto';
import { UpdateUserDto } from '../../../../../src/application/user/dto/update-user.dto';

jest.mock('bcryptjs');

describe('UserApplicationService', () => {
  let service: UserApplicationService;
  let userRepository: jest.Mocked<UserRepository>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser = new User(
    '123e4567-e89b-12d3-a456-426614174000',
    'john.doe@example.com',
    Password.createFromHash('$2a$10$hashedPassword'),
    'John',
    'Doe',
  );

  beforeEach(async () => {
    const mockUserRepository: Partial<UserRepository> = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      existsByEmail: jest.fn(),
    };

    const mockJwtService: Partial<JwtService> = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserApplicationService,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UserApplicationService>(UserApplicationService);
    userRepository = module.get(USER_REPOSITORY);
    jwtService = module.get(JwtService);

    // Set default mocks for bcrypt
    (bcrypt.hash as jest.Mock).mockResolvedValue('$2a$10$defaultHashedPassword');
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('registerUser', () => {
    const createUserDto: CreateUserDto = {
      email: 'jane.doe@example.com',
      password: 'Password123',
      firstName: 'Jane',
      lastName: 'Doe',
    };

    it('should successfully register a new user with valid data', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.save.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('mock.jwt.token');

      const result = await service.registerUser(createUserDto);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(userRepository.save).toHaveBeenCalled();
      expect(jwtService.sign).toHaveBeenCalled();
      expect(result.user).toBeDefined();
      expect(result.token).toBe('mock.jwt.token');
    });

    it('should throw BadRequestException when user already exists', async () => {
      userRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(service.registerUser(createUserDto)).rejects.toThrow(BadRequestException);
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for weak passwords (too short)', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      const weakPasswordDto = { ...createUserDto, password: 'Pass1' };

      await expect(service.registerUser(weakPasswordDto)).rejects.toThrow(BadRequestException);
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for weak passwords (no uppercase)', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      const weakPasswordDto = { ...createUserDto, password: 'password123' };

      await expect(service.registerUser(weakPasswordDto)).rejects.toThrow(BadRequestException);
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for weak passwords (no lowercase)', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      const weakPasswordDto = { ...createUserDto, password: 'PASSWORD123' };

      await expect(service.registerUser(weakPasswordDto)).rejects.toThrow(BadRequestException);
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for weak passwords (no numbers)', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      const weakPasswordDto = { ...createUserDto, password: 'PasswordABC' };

      await expect(service.registerUser(weakPasswordDto)).rejects.toThrow(BadRequestException);
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should hash password before saving', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.save.mockImplementation(async (user: User) => user);
      jwtService.sign.mockReturnValue('mock.jwt.token');
      (bcrypt.hash as jest.Mock).mockResolvedValue('$2a$10$mockedHashedPassword');

      await service.registerUser(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      const savedUser = userRepository.save.mock.calls[0][0];
      expect(savedUser.password).not.toBe(createUserDto.password);
    });

    it('should generate valid JWT token', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.save.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('mock.jwt.token');

      const result = await service.registerUser(createUserDto);

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      });
      expect(result.token).toBe('mock.jwt.token');
    });

    it('should create user with UUID', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.save.mockImplementation(async (user: User) => user);
      jwtService.sign.mockReturnValue('mock.jwt.token');

      await service.registerUser(createUserDto);

      const savedUser = userRepository.save.mock.calls[0][0];
      expect(savedUser.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
    });
  });

  describe('loginUser', () => {
    const email = 'john.doe@example.com';
    const password = 'Password123';

    it('should successfully login with valid credentials', async () => {
      userRepository.findByEmail.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('mock.jwt.token');
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.loginUser(email, password);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
      expect(result.user).toBe(mockUser);
      expect(result.token).toBe('mock.jwt.token');
    });

    it('should throw UnauthorizedException for non-existent user', async () => {
      userRepository.findByEmail.mockResolvedValue(null);

      await expect(service.loginUser(email, password)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      userRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.loginUser(email, password)).rejects.toThrow(UnauthorizedException);
    });

    it('should generate valid JWT token on successful login', async () => {
      userRepository.findByEmail.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('login.jwt.token');
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.loginUser(email, password);

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      });
      expect(result.token).toBe('login.jwt.token');
    });

    it('should compare hashed passwords correctly', async () => {
      userRepository.findByEmail.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('mock.jwt.token');
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await service.loginUser(email, password);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
    });
  });

  describe('getUserProfile', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';

    it('should return user profile for valid userId', async () => {
      userRepository.findById.mockResolvedValue(mockUser);

      const result = await service.getUserProfile(userId);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(result).toBe(mockUser);
    });

    it('should throw NotFoundException for non-existent user', async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(service.getUserProfile(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateUserProfile', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const updateUserDto: UpdateUserDto = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    };

    it('should successfully update user profile', async () => {
      const updatedUser = new User(
        userId,
        'jane.smith@example.com',
        Password.createFromHash('$2a$10$hashedPassword'),
        'Jane',
        'Smith',
      );

      userRepository.findById.mockResolvedValue(mockUser);
      userRepository.save.mockResolvedValue(updatedUser);

      const result = await service.updateUserProfile(userId, updateUserDto);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(userRepository.save).toHaveBeenCalled();
      expect(result).toBe(updatedUser);
    });

    it('should throw NotFoundException for non-existent user', async () => {
      userRepository.findById.mockResolvedValue(null);

      await expect(service.updateUserProfile(userId, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should throw ConflictException when email is already taken', async () => {
      const currentUser = new User(
        '123e4567-e89b-12d3-a456-426614174000',
        'john.doe@example.com',
        Password.createFromHash('$2a$10$hashedPassword'),
        'John',
        'Doe',
      );

      const existingUser = new User(
        'different-id',
        'jane.smith@example.com',
        Password.createFromHash('$2a$10$hashedPassword'),
        'Existing',
        'User',
      );

      userRepository.findById.mockResolvedValue(currentUser);
      userRepository.findByEmail.mockResolvedValue(existingUser);
      userRepository.save.mockResolvedValue(currentUser);

      await expect(service.updateUserProfile(userId, updateUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith('jane.smith@example.com');
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should allow updating email to same value (case-insensitive)', async () => {
      const sameEmailDto: UpdateUserDto = {
        email: 'JOHN.DOE@EXAMPLE.COM',
      };

      userRepository.findById.mockResolvedValue(mockUser);
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.save.mockResolvedValue(mockUser);

      await service.updateUserProfile(userId, sameEmailDto);

      expect(userRepository.save).toHaveBeenCalled();
    });

    it('should update updatedAt timestamp', async () => {
      const originalUpdatedAt = mockUser.updatedAt;

      userRepository.findById.mockResolvedValue(mockUser);
      userRepository.save.mockImplementation(async (user: User) => user);

      await service.updateUserProfile(userId, { firstName: 'NewName' });

      const savedUser = userRepository.save.mock.calls[0][0];
      expect(savedUser.updatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime());
    });

    it('should not check email conflict when email is not being changed', async () => {
      const updateWithoutEmail: UpdateUserDto = {
        firstName: 'Jane',
        lastName: 'Smith',
      };

      userRepository.findById.mockResolvedValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);

      await service.updateUserProfile(userId, updateWithoutEmail);

      expect(userRepository.findByEmail).not.toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalled();
    });
  });

  describe('listUsers', () => {
    it('should return all users', async () => {
      const users = [
        mockUser,
        new User(
          'another-id',
          'another@example.com',
          Password.createFromHash('$2a$10$hashedPassword'),
          'Another',
          'User',
        ),
      ];

      userRepository.findAll.mockResolvedValue(users);

      const result = await service.listUsers();

      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toBe(users);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no users exist', async () => {
      userRepository.findAll.mockResolvedValue([]);

      const result = await service.listUsers();

      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
