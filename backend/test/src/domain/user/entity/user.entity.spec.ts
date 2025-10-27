import { User } from '../../../../../src/domain/user/entity/user.entity';
import { Password } from '../../../../../src/domain/user/value-object/password.vo';

describe('User Entity', () => {
  const validEmail = 'john.doe@example.com';
  const validId = '123e4567-e89b-12d3-a456-426614174000';
  const validPassword = Password.createFromHash('$2a$10$hashedPassword123');
  const validFirstName = 'John';
  const validLastName = 'Doe';

  describe('constructor', () => {
    it('should create a valid user with all required fields', () => {
      const user = new User(validId, validEmail, validPassword, validFirstName, validLastName);

      expect(user.id).toBe(validId);
      expect(user.email).toBe(validEmail);
      expect(user.password).toBe(validPassword.value);
      expect(user.firstName).toBe(validFirstName);
      expect(user.lastName).toBe(validLastName);
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });

    it('should create user with provided createdAt and updatedAt dates', () => {
      const createdAt = new Date('2024-01-01');
      const updatedAt = new Date('2024-01-02');

      const user = new User(
        validId,
        validEmail,
        validPassword,
        validFirstName,
        validLastName,
        createdAt,
        updatedAt,
      );

      expect(user.createdAt).toBe(createdAt);
      expect(user.updatedAt).toBe(updatedAt);
    });

    it('should set createdAt and updatedAt to current date if not provided', () => {
      const beforeCreation = new Date();
      const user = new User(validId, validEmail, validPassword, validFirstName, validLastName);
      const afterCreation = new Date();

      expect(user.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
      expect(user.createdAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
      expect(user.updatedAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
      expect(user.updatedAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
    });

    it('should throw error for empty first name', () => {
      expect(() => {
        new User(validId, validEmail, validPassword, '', validLastName);
      }).toThrow('First name cannot be empty');
    });

    it('should throw error for whitespace-only first name', () => {
      expect(() => {
        new User(validId, validEmail, validPassword, '   ', validLastName);
      }).toThrow('First name cannot be empty');
    });

    it('should throw error for empty last name', () => {
      expect(() => {
        new User(validId, validEmail, validPassword, validFirstName, '');
      }).toThrow('Last name cannot be empty');
    });

    it('should throw error for whitespace-only last name', () => {
      expect(() => {
        new User(validId, validEmail, validPassword, validFirstName, '   ');
      }).toThrow('Last name cannot be empty');
    });

    it('should throw error for empty password', () => {
      expect(() => {
        Password.createFromHash('');
      }).toThrow('Password cannot be empty');
    });
  });

  describe('updateProfile', () => {
    let user: User;

    beforeEach(() => {
      user = new User(validId, validEmail, validPassword, validFirstName, validLastName);
    });

    it('should update first name', () => {
      const newFirstName = 'Jane';
      user.updateProfile(newFirstName);

      expect(user.firstName).toBe(newFirstName);
      expect(user.lastName).toBe(validLastName);
      expect(user.email).toBe(validEmail);
    });

    it('should update last name', () => {
      const newLastName = 'Smith';
      user.updateProfile(undefined, newLastName);

      expect(user.firstName).toBe(validFirstName);
      expect(user.lastName).toBe(newLastName);
      expect(user.email).toBe(validEmail);
    });

    it('should update email', () => {
      const newEmail = 'jane.smith@example.com';
      user.updateProfile(undefined, undefined, newEmail);

      expect(user.firstName).toBe(validFirstName);
      expect(user.lastName).toBe(validLastName);
      expect(user.email).toBe(newEmail);
    });

    it('should update all fields at once', () => {
      const newFirstName = 'Jane';
      const newLastName = 'Smith';
      const newEmail = 'jane.smith@example.com';

      user.updateProfile(newFirstName, newLastName, newEmail);

      expect(user.firstName).toBe(newFirstName);
      expect(user.lastName).toBe(newLastName);
      expect(user.email).toBe(newEmail);
    });

    it('should update updatedAt timestamp', () => {
      const originalUpdatedAt = user.updatedAt;

      // Wait a bit to ensure timestamp difference
      setTimeout(() => {
        user.updateProfile('Jane');
        expect(user.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
      }, 10);
    });

    it('should throw error when updating to empty first name', () => {
      expect(() => {
        user.updateProfile('');
      }).toThrow('First name cannot be empty');
    });

    it('should throw error when updating to whitespace-only first name', () => {
      expect(() => {
        user.updateProfile('   ');
      }).toThrow('First name cannot be empty');
    });

    it('should throw error when updating to empty last name', () => {
      expect(() => {
        user.updateProfile(undefined, '');
      }).toThrow('Last name cannot be empty');
    });

    it('should throw error when updating to whitespace-only last name', () => {
      expect(() => {
        user.updateProfile(undefined, '   ');
      }).toThrow('Last name cannot be empty');
    });

    it('should not update fields when no parameters provided', () => {
      const originalFirstName = user.firstName;
      const originalLastName = user.lastName;
      const originalEmail = user.email;

      user.updateProfile();

      expect(user.firstName).toBe(originalFirstName);
      expect(user.lastName).toBe(originalLastName);
      expect(user.email).toBe(originalEmail);
    });
  });

  describe('updatePassword', () => {
    let user: User;

    beforeEach(() => {
      user = new User(validId, validEmail, validPassword, validFirstName, validLastName);
    });

    it('should update password', () => {
      const newPassword = Password.createFromHash('$2a$10$newHashedPassword456');
      user.updatePassword(newPassword);

      expect(user.password).toBe(newPassword.value);
    });

    it('should update updatedAt timestamp', () => {
      const originalUpdatedAt = user.updatedAt;

      setTimeout(() => {
        const newPassword = Password.createFromHash('$2a$10$newPassword');
        user.updatePassword(newPassword);
        expect(user.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
      }, 10);
    });

    it('should throw error for empty password', () => {
      expect(() => {
        Password.createFromHash('');
      }).toThrow('Password cannot be empty');
    });

    it('should throw error for undefined password', () => {
      expect(() => {
        Password.createFromHash(undefined as any);
      }).toThrow('Password cannot be empty');
    });

    it('should throw error for null password', () => {
      expect(() => {
        Password.createFromHash(null as any);
      }).toThrow('Password cannot be empty');
    });
  });

  describe('getters', () => {
    let user: User;
    const createdAt = new Date('2024-01-01');
    const updatedAt = new Date('2024-01-02');

    beforeEach(() => {
      user = new User(
        validId,
        validEmail,
        validPassword,
        validFirstName,
        validLastName,
        createdAt,
        updatedAt,
      );
    });

    it('should return id', () => {
      expect(user.id).toBe(validId);
    });

    it('should return email', () => {
      expect(user.email).toBe(validEmail);
    });

    it('should return password', () => {
      expect(user.password).toBe(validPassword.value);
    });

    it('should return firstName', () => {
      expect(user.firstName).toBe(validFirstName);
    });

    it('should return lastName', () => {
      expect(user.lastName).toBe(validLastName);
    });

    it('should return createdAt', () => {
      expect(user.createdAt).toBe(createdAt);
    });

    it('should return updatedAt', () => {
      expect(user.updatedAt).toBe(updatedAt);
    });

    it('should return fullName', () => {
      expect(user.fullName).toBe('John Doe');
    });

    it('should return correct fullName after profile update', () => {
      user.updateProfile('Jane', 'Smith');
      expect(user.fullName).toBe('Jane Smith');
    });
  });

  describe('immutability', () => {
    it('should not allow id to be modified', () => {
      const user = new User(validId, validEmail, validPassword, validFirstName, validLastName);

      expect(() => {
        (user as any).id = 'new-id';
      }).toThrow();
    });

    it('should not allow createdAt to be modified', () => {
      const user = new User(validId, validEmail, validPassword, validFirstName, validLastName);

      expect(() => {
        (user as any).createdAt = new Date();
      }).toThrow();
    });
  });
});
