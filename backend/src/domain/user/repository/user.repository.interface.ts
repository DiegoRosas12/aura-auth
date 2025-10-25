import { User } from '../entity/user.entity';
import { Email } from '../value-object/email.vo';

export interface IUserRepository {
  save(user: User): Promise<User>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: Email): Promise<User | null>;

  findAll(): Promise<User[]>;

  update(id: string, user: Partial<User>): Promise<User>;

  delete(id: string): Promise<void>;

  existsByEmail(email: Email): Promise<boolean>;
}

export const USER_REPOSITORY = Symbol('IUserRepository');
