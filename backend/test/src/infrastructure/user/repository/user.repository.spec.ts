import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDBRepository } from '../../../../../src/infrastructure/user/repository/user-db.repository';
import { UserRepository } from '../../../../../src/domain/user/repository/user.repository.interface';
import { UserOrmEntity } from '../../../../../src/infrastructure/user/database/entity/user.orm-entity';
import { User } from '../../../../../src/domain/user/entity/user.entity';
import { Password } from '../../../../../src/domain/user/value-object/password.vo';

describe('UserDBRepository', () => {
  let userRepository: UserRepository;
  let ormRepository: jest.Mocked<Repository<UserOrmEntity>>;

  const mockOrmEntity: UserOrmEntity = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'john.doe@example.com',
    password: '$2a$10$hashedPassword',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
  };

  const mockDomainEntity = new User(
    '123e4567-e89b-12d3-a456-426614174000',
    'john.doe@example.com',
    Password.createFromHash('$2a$10$hashedPassword'),
    'John',
    'Doe',
    new Date('2024-01-01'),
    new Date('2024-01-02'),
  );

  beforeEach(async () => {
    const mockOrmRepository: Partial<Repository<UserOrmEntity>> = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDBRepository,
        {
          provide: getRepositoryToken(UserOrmEntity),
          useValue: mockOrmRepository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserDBRepository);
    ormRepository = module.get(getRepositoryToken(UserOrmEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Domain to ORM Mapping', () => {
    it('should correctly convert ORM entity to domain entity', async () => {
      ormRepository.findOne.mockResolvedValue(mockOrmEntity);

      const result = await userRepository.findById(mockOrmEntity.id);

      expect(result).toBeInstanceOf(User);
      expect(result?.id).toBe(mockOrmEntity.id);
      expect(result?.email).toBe(mockOrmEntity.email);
      expect(result?.password).toBe(mockOrmEntity.password);
      expect(result?.firstName).toBe(mockOrmEntity.firstName);
      expect(result?.lastName).toBe(mockOrmEntity.lastName);
      expect(result?.createdAt).toEqual(mockOrmEntity.createdAt);
      expect(result?.updatedAt).toEqual(mockOrmEntity.updatedAt);
    });

    it('should correctly convert domain entity to ORM entity', async () => {
      ormRepository.save.mockImplementation(async (entity) => entity as UserOrmEntity);

      await userRepository.save(mockDomainEntity);

      const savedOrmEntity = ormRepository.save.mock.calls[0][0];
      expect(savedOrmEntity.id).toBe(mockDomainEntity.id);
      expect(savedOrmEntity.email).toBe(mockDomainEntity.email);
      expect(savedOrmEntity.password).toBe(mockDomainEntity.password);
      expect(savedOrmEntity.firstName).toBe(mockDomainEntity.firstName);
      expect(savedOrmEntity.lastName).toBe(mockDomainEntity.lastName);
      expect(savedOrmEntity.createdAt).toEqual(mockDomainEntity.createdAt);
      expect(savedOrmEntity.updatedAt).toEqual(mockDomainEntity.updatedAt);
    });
  });

  describe('save', () => {
    it('should persist user and return domain entity', async () => {
      ormRepository.save.mockResolvedValue(mockOrmEntity);

      const result = await userRepository.save(mockDomainEntity);

      expect(ormRepository.save).toHaveBeenCalled();
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe(mockOrmEntity.id);
      expect(result.email).toBe(mockOrmEntity.email);
    });

    it('should handle new user creation', async () => {
      const newUser = new User(
        'new-id',
        'new@example.com',
        Password.createFromHash('$2a$10$hashedPassword'),
        'New',
        'User',
      );

      const newOrmEntity: UserOrmEntity = {
        id: 'new-id',
        email: 'new@example.com',
        password: 'hashedPassword',
        firstName: 'New',
        lastName: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      ormRepository.save.mockResolvedValue(newOrmEntity);

      const result = await userRepository.save(newUser);

      expect(ormRepository.save).toHaveBeenCalled();
      expect(result.id).toBe('new-id');
      expect(result.email).toBe('new@example.com');
    });
  });

  describe('findById', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';

    it('should return user when found', async () => {
      ormRepository.findOne.mockResolvedValue(mockOrmEntity);

      const result = await userRepository.findById(userId);

      expect(ormRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
      expect(result).toBeInstanceOf(User);
      expect(result?.id).toBe(userId);
    });

    it('should return null when not found', async () => {
      ormRepository.findOne.mockResolvedValue(null);

      const result = await userRepository.findById('non-existent-id');

      expect(ormRepository.findOne).toHaveBeenCalledWith({ where: { id: 'non-existent-id' } });
      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    const email = 'john.doe@example.com';

    it('should return user when found', async () => {
      ormRepository.findOne.mockResolvedValue(mockOrmEntity);

      const result = await userRepository.findByEmail(email);

      expect(ormRepository.findOne).toHaveBeenCalledWith({
        where: { email: email.toLowerCase().trim() },
      });
      expect(result).toBeInstanceOf(User);
      expect(result?.email).toBe(email);
    });

    it('should return null when not found', async () => {
      ormRepository.findOne.mockResolvedValue(null);

      const result = await userRepository.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });

    it('should handle case-insensitive email search', async () => {
      ormRepository.findOne.mockResolvedValue(mockOrmEntity);

      await userRepository.findByEmail('JOHN.DOE@EXAMPLE.COM');

      expect(ormRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'john.doe@example.com' },
      });
    });

    it('should trim email before searching', async () => {
      ormRepository.findOne.mockResolvedValue(mockOrmEntity);

      await userRepository.findByEmail('  john.doe@example.com  ');

      expect(ormRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'john.doe@example.com' },
      });
    });

    it('should trim and lowercase email before searching', async () => {
      ormRepository.findOne.mockResolvedValue(mockOrmEntity);

      await userRepository.findByEmail('  JOHN.DOE@EXAMPLE.COM  ');

      expect(ormRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'john.doe@example.com' },
      });
    });
  });

  describe('findAll', () => {
    it('should return all users as domain entities', async () => {
      const ormEntities: UserOrmEntity[] = [
        mockOrmEntity,
        {
          id: 'another-id',
          email: 'jane@example.com',
          password: 'hashedPassword',
          firstName: 'Jane',
          lastName: 'Smith',
          createdAt: new Date('2024-01-03'),
          updatedAt: new Date('2024-01-04'),
        },
      ];

      ormRepository.find.mockResolvedValue(ormEntities);

      const result = await userRepository.findAll();

      expect(ormRepository.find).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(User);
      expect(result[1]).toBeInstanceOf(User);
      expect(result[0].email).toBe('john.doe@example.com');
      expect(result[1].email).toBe('jane@example.com');
    });

    it('should return empty array when no users exist', async () => {
      ormRepository.find.mockResolvedValue([]);

      const result = await userRepository.findAll();

      expect(ormRepository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('update', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';

    it('should update user and return domain entity', async () => {
      const updatedOrmEntity: UserOrmEntity = {
        ...mockOrmEntity,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
      };

      ormRepository.update.mockResolvedValue({ affected: 1 } as any);
      ormRepository.findOne.mockResolvedValue(updatedOrmEntity);

      const partialUser: Partial<User> = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
      };

      const result = await userRepository.update(userId, partialUser);

      expect(ormRepository.update).toHaveBeenCalledWith(
        userId,
        expect.objectContaining({
          email: 'jane.smith@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
        }),
      );
      expect(ormRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
      expect(result).toBeInstanceOf(User);
      expect(result.firstName).toBe('Jane');
    });

    it('should update updatedAt timestamp', async () => {
      ormRepository.update.mockResolvedValue({ affected: 1 } as any);
      ormRepository.findOne.mockResolvedValue(mockOrmEntity);

      await userRepository.update(userId, { firstName: 'NewName' });

      expect(ormRepository.update).toHaveBeenCalledWith(
        userId,
        expect.objectContaining({
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  describe('delete', () => {
    it('should delete user by id', async () => {
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      ormRepository.delete.mockResolvedValue({ affected: 1 } as any);

      await userRepository.delete(userId);

      expect(ormRepository.delete).toHaveBeenCalledWith(userId);
    });
  });

  describe('existsByEmail', () => {
    const email = 'john.doe@example.com';

    it('should return true when email exists', async () => {
      ormRepository.count.mockResolvedValue(1);

      const result = await userRepository.existsByEmail(email);

      expect(ormRepository.count).toHaveBeenCalledWith({
        where: { email: email.toLowerCase().trim() },
      });
      expect(result).toBe(true);
    });

    it('should return false when email does not exist', async () => {
      ormRepository.count.mockResolvedValue(0);

      const result = await userRepository.existsByEmail('nonexistent@example.com');

      expect(result).toBe(false);
    });

    it('should handle case-insensitive email check', async () => {
      ormRepository.count.mockResolvedValue(1);

      await userRepository.existsByEmail('JOHN.DOE@EXAMPLE.COM');

      expect(ormRepository.count).toHaveBeenCalledWith({
        where: { email: 'john.doe@example.com' },
      });
    });

    it('should trim email before checking', async () => {
      ormRepository.count.mockResolvedValue(1);

      await userRepository.existsByEmail('  john.doe@example.com  ');

      expect(ormRepository.count).toHaveBeenCalledWith({
        where: { email: 'john.doe@example.com' },
      });
    });
  });
});
