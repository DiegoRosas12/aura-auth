import { User } from '@domain/entities/User'

/**
 * User Data Transfer Object from API
 */
export interface UserDto {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}

/**
 * User Mapper
 * Converts between domain entities and DTOs
 */
export class UserMapper {
  /**
   * Convert DTO to domain entity
   */
  static toDomain(dto: UserDto): User {
    return {
      id: dto.id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    }
  }

  /**
   * Convert domain entity to DTO
   */
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
  }

  /**
   * Convert array of DTOs to domain entities
   */
  static toDomainList(dtos: UserDto[]): User[] {
    return dtos.map((dto) => this.toDomain(dto))
  }
}
