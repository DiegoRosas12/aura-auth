/**
 * Query: Get User Profile
 * Represents the intent to retrieve a user's profile
 */

export class GetUserProfileQuery {
  constructor(public readonly userId: string) {}
}
