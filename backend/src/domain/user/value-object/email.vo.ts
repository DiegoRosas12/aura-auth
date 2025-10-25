/**
 * Value Object: Email
 * Encapsulates email validation logic and ensures email immutability.
 * Value objects are immutable and defined by their attributes.
 */

export class Email {
  private readonly _value: string;

  constructor(email: string) {
    this._value = email.toLowerCase().trim();
    this.validate();
  }

  /**
   * Validates email format using regex
   */
  private validate(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!this._value || this._value.length === 0) {
      throw new Error('Email cannot be empty');
    }

    if (!emailRegex.test(this._value)) {
      throw new Error('Invalid email format');
    }

    if (this._value.length > 255) {
      throw new Error('Email is too long');
    }
  }

  get value(): string {
    return this._value;
  }

  /**
   * Compares two email value objects
   */
  equals(other: Email): boolean {
    if (!other) {
      return false;
    }
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
