import { User } from '@domain/entity/User'

export interface UserDto {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt?: string
  updatedAt?: string
}

export class UserMapper {
  static toDomain(dto: UserDto): User {
    const now = new Date()
    return {
      id: dto.id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : now,
      updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : (dto.createdAt ? new Date(dto.createdAt) : now),
    }
  }

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

  static toDomainList(dtos: UserDto[]): User[] {
    return dtos.map((dto) => this.toDomain(dto))
  }
}
