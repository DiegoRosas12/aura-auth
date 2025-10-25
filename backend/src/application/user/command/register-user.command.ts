/**
 * Command: Register User
 * Represents the intent to register a new user in the system
 */

export class RegisterUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}
}
