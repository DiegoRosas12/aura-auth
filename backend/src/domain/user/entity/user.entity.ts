import { Password } from '../value-object/password.vo';

export class User {
  private readonly _id: string;
  private _email: string;
  private _password: string;
  private _firstName: string;
  private _lastName: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    email: string,
    password: Password,
    firstName: string,
    lastName: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this._id = id;
    this._email = email.toLowerCase().trim();
    this._password = password.value;
    this._firstName = firstName;
    this._lastName = lastName;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();

    this.validate();
  }

  private validate(): void {
    if (!this._firstName || this._firstName.trim().length === 0) {
      throw new Error('First name cannot be empty');
    }

    if (!this._lastName || this._lastName.trim().length === 0) {
      throw new Error('Last name cannot be empty');
    }

    if (!this._password || this._password.length === 0) {
      throw new Error('Password cannot be empty');
    }
  }

  public updateProfile(firstName?: string, lastName?: string, email?: string): void {
    if (firstName !== undefined) {
      this._firstName = firstName;
    }

    if (lastName !== undefined) {
      this._lastName = lastName;
    }

    if (email !== undefined) {
      this._email = email.toLowerCase().trim();
    }

    this._updatedAt = new Date();
    this.validate();
  }

  public updatePassword(newPassword: Password): void {
    this._password = newPassword.value;
    this._updatedAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }
}
