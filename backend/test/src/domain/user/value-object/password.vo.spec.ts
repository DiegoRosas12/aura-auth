import { Password } from '../../../../../src/domain/user/value-object/password.vo';

describe('Password Value Object', () => {
  describe('createFromPlainText', () => {
    it('should create password from valid plain text', () => {
      const password = Password.createFromPlainText('Password123');

      expect(password).toBeInstanceOf(Password);
      expect(password.value).toBe('Password123');
    });

    it('should throw error for empty password', () => {
      expect(() => Password.createFromPlainText('')).toThrow('Password cannot be empty');
    });

    it('should throw error for password shorter than 8 characters', () => {
      expect(() => Password.createFromPlainText('Pass1')).toThrow(
        'Password must be at least 8 characters long',
      );
    });

    it('should throw error for password without uppercase letters', () => {
      expect(() => Password.createFromPlainText('password123')).toThrow(
        'Password must contain uppercase, lowercase, and numbers',
      );
    });

    it('should throw error for password without lowercase letters', () => {
      expect(() => Password.createFromPlainText('PASSWORD123')).toThrow(
        'Password must contain uppercase, lowercase, and numbers',
      );
    });

    it('should throw error for password without numbers', () => {
      expect(() => Password.createFromPlainText('PasswordABC')).toThrow(
        'Password must contain uppercase, lowercase, and numbers',
      );
    });

    it('should accept password with special characters', () => {
      expect(() => Password.createFromPlainText('P@ssw0rd!')).not.toThrow();
    });

    it('should accept password with exactly 8 characters', () => {
      expect(() => Password.createFromPlainText('Test1234')).not.toThrow();
    });

    it('should accept very long passwords', () => {
      expect(() =>
        Password.createFromPlainText('VeryLongPassword123WithManyCharacters'),
      ).not.toThrow();
    });

    it('should accept multiple valid password formats', () => {
      const validPasswords = [
        'Password123',
        'MyP@ssw0rd',
        'Test1234',
        'Abcdefg1',
        'ValidPass123',
        'Str0ngP@ssword',
      ];

      validPasswords.forEach((password) => {
        expect(() => Password.createFromPlainText(password)).not.toThrow();
      });
    });

    it('should reject multiple short passwords', () => {
      const shortPasswords = ['Pass1', 'Abc123', 'Test1', 'Short1'];

      shortPasswords.forEach((password) => {
        expect(() => Password.createFromPlainText(password)).toThrow(
          'Password must be at least 8 characters long',
        );
      });
    });

    it('should reject multiple passwords without uppercase', () => {
      const noUppercasePasswords = ['password123', 'mypassword1', 'test12345', 'lowercase123'];

      noUppercasePasswords.forEach((password) => {
        expect(() => Password.createFromPlainText(password)).toThrow(
          'Password must contain uppercase, lowercase, and numbers',
        );
      });
    });

    it('should reject multiple passwords without lowercase', () => {
      const noLowercasePasswords = ['PASSWORD123', 'MYPASSWORD1', 'TEST12345', 'UPPERCASE123'];

      noLowercasePasswords.forEach((password) => {
        expect(() => Password.createFromPlainText(password)).toThrow(
          'Password must contain uppercase, lowercase, and numbers',
        );
      });
    });

    it('should reject multiple passwords without numbers', () => {
      const noNumberPasswords = ['PasswordABC', 'MyPassword', 'TestPassword', 'NoNumbers'];

      noNumberPasswords.forEach((password) => {
        expect(() => Password.createFromPlainText(password)).toThrow(
          'Password must contain uppercase, lowercase, and numbers',
        );
      });
    });

    it('should accept passwords with multiple special characters', () => {
      const withSpecialChars = ['P@ssw0rd', 'Test123!', 'MyP@ss1!', 'Str0ng#Pass', 'Valid$123'];

      withSpecialChars.forEach((password) => {
        expect(() => Password.createFromPlainText(password)).not.toThrow();
      });
    });

    it('should accept passwords with multiple numbers', () => {
      const multipleNumbers = ['Pass123456', 'Test999888', 'My1234Pass'];

      multipleNumbers.forEach((password) => {
        expect(() => Password.createFromPlainText(password)).not.toThrow();
      });
    });

    it('should accept passwords with spaces', () => {
      const withSpaces = ['Pass Word 123', 'My Pass1', 'Test 1234'];

      withSpaces.forEach((password) => {
        expect(() => Password.createFromPlainText(password)).not.toThrow();
      });
    });
  });

  describe('createFromHash', () => {
    it('should create password from hashed value', () => {
      const hashedValue = '$2a$10$hashedPasswordValue';
      const password = Password.createFromHash(hashedValue);

      expect(password).toBeInstanceOf(Password);
      expect(password.value).toBe(hashedValue);
    });

    it('should not validate password strength for hashed passwords', () => {
      // This would fail validation if it were plain text
      const weakHashedPassword = '$2a$10$weak';

      expect(() => Password.createFromHash(weakHashedPassword)).not.toThrow();
    });

    it('should throw error for empty hashed password', () => {
      expect(() => Password.createFromHash('')).toThrow('Password cannot be empty');
    });
  });

  describe('equals', () => {
    it('should return true for passwords with same value', () => {
      const password1 = Password.createFromPlainText('Password123');
      const password2 = Password.createFromPlainText('Password123');

      expect(password1.equals(password2)).toBe(true);
    });

    it('should return false for passwords with different values', () => {
      const password1 = Password.createFromPlainText('Password123');
      const password2 = Password.createFromPlainText('DifferentPass456');

      expect(password1.equals(password2)).toBe(false);
    });

    it('should work with hashed passwords', () => {
      const hash = '$2a$10$hashedValue';
      const password1 = Password.createFromHash(hash);
      const password2 = Password.createFromHash(hash);

      expect(password1.equals(password2)).toBe(true);
    });
  });

  describe('value getter', () => {
    it('should return the password value', () => {
      const plainPassword = Password.createFromPlainText('Password123');
      expect(plainPassword.value).toBe('Password123');

      const hashedPassword = Password.createFromHash('$2a$10$hash');
      expect(hashedPassword.value).toBe('$2a$10$hash');
    });
  });
});
