export class Password {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static createFromPlainText(plainPassword: string): Password {
    this.validate(plainPassword);
    return new Password(plainPassword);
  }

  static createFromHash(hashedPassword: string): Password {
    if (!hashedPassword || hashedPassword.length === 0) {
      throw new Error('Password cannot be empty');
    }
    return new Password(hashedPassword);
  }

  private static validate(password: string): void {
    if (!password || password.length === 0) {
      throw new Error('Password cannot be empty');
    }

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

  get value(): string {
    return this._value;
  }

  equals(other: Password): boolean {
    return this._value === other._value;
  }
}
