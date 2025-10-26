/**
 * Repository Implementation: User Repository
 * Implements the IUserRepository interface using TypeORM
 * Handles data persistence and retrieval operations
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../domain/user/entity/user.entity';
import { IUserRepository } from '../../../domain/user/repository/user.repository.interface';
import { UserOrmEntity } from '../database/entity/user.orm-entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userOrmRepository: Repository<UserOrmEntity>,
  ) {}

  private toDomain(ormEntity: UserOrmEntity): User {
    return new User(
      ormEntity.id,
      ormEntity.email,
      ormEntity.password,
      ormEntity.firstName,
      ormEntity.lastName,
      ormEntity.createdAt,
      ormEntity.updatedAt,
    );
  }

  private toOrm(domainEntity: User): UserOrmEntity {
    const ormEntity = new UserOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.email = domainEntity.email;
    ormEntity.password = domainEntity.password;
    ormEntity.firstName = domainEntity.firstName;
    ormEntity.lastName = domainEntity.lastName;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;
    return ormEntity;
  }

  async save(user: User): Promise<User> {
    const ormEntity = this.toOrm(user);
    const saved = await this.userOrmRepository.save(ormEntity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<User | null> {
    const ormEntity = await this.userOrmRepository.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormEntity = await this.userOrmRepository.findOne({
      where: { email: email.toLowerCase().trim() },
    });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findAll(): Promise<User[]> {
    const ormEntities = await this.userOrmRepository.find();
    return ormEntities.map((entity) => this.toDomain(entity));
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.userOrmRepository.update(id, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      updatedAt: new Date(),
    });

    const updated = await this.userOrmRepository.findOne({ where: { id } });
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.userOrmRepository.delete(id);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.userOrmRepository.count({
      where: { email: email.toLowerCase().trim() },
    });
    return count > 0;
  }
}
