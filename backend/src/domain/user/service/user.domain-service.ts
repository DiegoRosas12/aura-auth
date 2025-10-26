import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Email } from '../value-object/email.vo';

@Injectable()
export class UserDomainService {

  validateUniqueEmail(existingUser: User | null, email: Email): void {
    if (existingUser) {
      throw new Error(`User with email ${email.value} already exists`);
    }
  }

  validateProfileUpdate(user: User | null): void {
    if (!user) {
      throw new Error('User not found');
    }
  }

  validatePasswordStrength(password: string): void {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      throw new Error('Password must contain uppercase, lowercase, and numbers');
    }
  }


  createUser(
    id: string,
    email: Email,
    hashedPassword: string,
    firstName: string,
    lastName: string,
  ): User {
    return new User(id, email, hashedPassword, firstName, lastName);
  }
}
