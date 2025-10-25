import { Email } from '../../../../../src/domain/user/value-object/email.vo';

describe('Email Value Object', () => {
  describe('constructor', () => {
    it('should create a valid email', () => {
      const email = new Email('test@example.com');
      expect(email.value).toBe('test@example.com');
    });

    it('should trim and lowercase email', () => {
      const email = new Email('  TEST@EXAMPLE.COM  ');
      expect(email.value).toBe('test@example.com');
    });

    it('should throw error for empty email', () => {
      expect(() => new Email('')).toThrow('Email cannot be empty');
    });

    it('should throw error for whitespace-only email', () => {
      expect(() => new Email('   ')).toThrow('Email cannot be empty');
    });

    it('should throw error for invalid email format - missing @', () => {
      expect(() => new Email('testexample.com')).toThrow('Invalid email format');
    });

    it('should throw error for invalid email format - missing domain', () => {
      expect(() => new Email('test@')).toThrow('Invalid email format');
    });

    it('should throw error for invalid email format - missing local part', () => {
      expect(() => new Email('@example.com')).toThrow('Invalid email format');
    });

    it('should throw error for invalid email format - missing TLD', () => {
      expect(() => new Email('test@example')).toThrow('Invalid email format');
    });

    it('should throw error for email with spaces', () => {
      expect(() => new Email('test user@example.com')).toThrow('Invalid email format');
    });

    it('should throw error for email longer than 255 characters', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      expect(() => new Email(longEmail)).toThrow('Email is too long');
    });

    it('should accept valid email with subdomain', () => {
      const email = new Email('user@mail.example.com');
      expect(email.value).toBe('user@mail.example.com');
    });

    it('should accept valid email with plus sign', () => {
      const email = new Email('user+tag@example.com');
      expect(email.value).toBe('user+tag@example.com');
    });

    it('should accept valid email with dots', () => {
      const email = new Email('first.last@example.com');
      expect(email.value).toBe('first.last@example.com');
    });

    it('should accept valid email with numbers', () => {
      const email = new Email('user123@example456.com');
      expect(email.value).toBe('user123@example456.com');
    });
  });

  describe('equals', () => {
    it('should return true for equal emails', () => {
      const email1 = new Email('test@example.com');
      const email2 = new Email('test@example.com');
      expect(email1.equals(email2)).toBe(true);
    });

    it('should return true for equal emails with different casing', () => {
      const email1 = new Email('TEST@EXAMPLE.COM');
      const email2 = new Email('test@example.com');
      expect(email1.equals(email2)).toBe(true);
    });

    it('should return false for different emails', () => {
      const email1 = new Email('test1@example.com');
      const email2 = new Email('test2@example.com');
      expect(email1.equals(email2)).toBe(false);
    });

    it('should return false when comparing with null', () => {
      const email = new Email('test@example.com');
      expect(email.equals(null)).toBe(false);
    });

    it('should return false when comparing with undefined', () => {
      const email = new Email('test@example.com');
      expect(email.equals(undefined)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return email value as string', () => {
      const email = new Email('test@example.com');
      expect(email.toString()).toBe('test@example.com');
    });

    it('should return normalized email value', () => {
      const email = new Email('  TEST@EXAMPLE.COM  ');
      expect(email.toString()).toBe('test@example.com');
    });
  });

  describe('value getter', () => {
    it('should return the email value', () => {
      const email = new Email('test@example.com');
      expect(email.value).toBe('test@example.com');
    });

    it('should be immutable', () => {
      const email = new Email('test@example.com');
      const value = email.value;
      expect(value).toBe('test@example.com');
      // Value object should be immutable - no setter exists
      expect(() => {
        (email as any).value = 'new@example.com';
      }).toThrow();
    });
  });
});
