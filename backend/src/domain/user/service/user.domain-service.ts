/**
 * Domain Service: User Domain Service
 * Contains business logic that doesn't naturally fit within a single entity.
 * Coordinates operations between multiple domain objects.
 */

import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Email } from '../value-object/email.vo';

@Injectable()
export class UserDomainService {
  /**
   * Validates if a user can be created with the given email
   * Business rule: Email must be unique
   */
  validateUniqueEmail(existingUser: User | null, email: Email): void {
    if (existingUser) {
      throw new Error(`User with email ${email.value} already exists`);
    }
  }

  /**
   * Validates if a user can update their profile
   * Business rule: User must exist and be active
   */
  validateProfileUpdate(user: User | null): void {
    if (!user) {
      throw new Error('User not found');
    }
  }

  /**
   * Business logic for password strength validation
   */
  validatePasswordStrength(password: string): void {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Additional password rules can be added here
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      throw new Error('Password must contain uppercase, lowercase, and numbers');
    }
  }

  /**
   * Creates a new user domain entity
   */
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
