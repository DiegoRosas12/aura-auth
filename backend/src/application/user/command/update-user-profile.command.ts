/**
 * Command: Update User Profile
 * Represents the intent to update a user's profile information
 */

export class UpdateUserProfileCommand {
  constructor(
    public readonly userId: string,
    public readonly email?: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
  ) {}
}
