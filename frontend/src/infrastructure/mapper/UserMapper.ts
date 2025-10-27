import { User } from '@/domain/dto/User'

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
      updatedAt: dto.updatedAt
        ? new Date(dto.updatedAt)
        : dto.createdAt
          ? new Date(dto.createdAt)
          : now,
    }
  }

  static toDomainList(dtos: UserDto[]): User[] {
    return dtos.map((dto) => this.toDomain(dto))
  }
}
