import { User } from '../entity/user.entity';

export interface UserRepository {
  save(user: User): Promise<User>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  findAll(): Promise<User[]>;

  update(id: string, user: Partial<User>): Promise<User>;

  delete(id: string): Promise<void>;

  existsByEmail(email: string): Promise<boolean>;
}

export const USER_REPOSITORY = Symbol('UserRepository');
