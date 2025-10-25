/**
 * Query: List Users
 * Represents the intent to retrieve all users from the system
 */

export class ListUsersQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}
}
