# Aura Auth API

A RESTful API built with NestJS, TypeScript, Clean Architecture, and Domain-Driven Design (DDD) principles. Features JWT authentication, PostgreSQL database, and comprehensive user management.

## 🏗️ Architecture

This project follows **Clean Architecture** and **Domain-Driven Design (DDD)** principles with clear separation of concerns:

```
src/
├── domain/              # Business logic and rules (framework-agnostic)
│   └── user/
│       ├── entities/           # Domain entities
│       ├── value-objects/      # Immutable value objects
│       ├── repositories/       # Repository interfaces
│       └── services/           # Domain services
│
├── application/         # Use cases and application logic
│   └── user/
│       ├── dtos/              # Data Transfer Objects
│       ├── commands/          # Command objects (CQRS pattern)
│       ├── queries/           # Query objects (CQRS pattern)
│       └── services/          # Application services
│
├── infrastructure/      # External concerns (database, security)
│   ├── database/
│   │   ├── entities/          # TypeORM entities
│   │   ├── migrations/        # Database migrations
│   │   └── database.module.ts
│   ├── repositories/          # Repository implementations
│   └── security/              # JWT strategy and guards
│
├── presentation/        # HTTP layer (controllers)
│   └── user/
│       ├── auth.controller.ts
│       ├── user.controller.ts
│       └── dtos/
│
└── shared/             # Shared utilities
    ├── exceptions/
    └── pipes/
```

## 🚀 Features

- ✅ **Clean Architecture** with DDD principles
- ✅ **JWT Authentication** with Passport
- ✅ **PostgreSQL** database with TypeORM
- ✅ **Database Migrations** for version control
- ✅ **Data Validation** using class-validator
- ✅ **Error Handling** with custom exception filters
- ✅ **Docker Support** with docker-compose
- ✅ **SOLID Principles** and best practices
- ✅ **TypeScript** for type safety

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running without Docker)

## 🛠️ Installation

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

3. **Start the application**
   ```bash
   docker-compose up --build
   ```

   The API will be available at `http://localhost:3000`

### Option 2: Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` with your local database credentials**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=aura_auth
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRATION=1d
   ```

4. **Run PostgreSQL** (if not using Docker)
   ```bash
   # Using Docker for PostgreSQL only
   docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=aura_auth -p 5432:5432 -d postgres:16-alpine
   ```

5. **Run migrations**
   ```bash
   npm run migration:run
   ```

6. **Start the development server**
   ```bash
   npm run start:dev
   ```

## 📡 API Endpoints

### Authentication

#### Register a new user
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### User Management (Requires Authentication)

#### Get current user profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Profile retrieved successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update user profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "newemail@example.com"
}
```

#### List all users
```http
GET /api/users
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=aura_auth

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=1d
```

⚠️ **Important:** Change `JWT_SECRET` to a strong, random string in production!

## 🗄️ Database Migrations

### Create a new migration
```bash
npm run migration:generate -- src/infrastructure/database/migrations/MigrationName
```

### Run migrations
```bash
npm run migration:run
```

### Revert last migration
```bash
npm run migration:revert
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Project Scripts

```bash
npm run build          # Build the project
npm run start          # Start production server
npm run start:dev      # Start development server with watch mode
npm run start:debug    # Start with debugging
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## 🏛️ Design Patterns & Principles

### Clean Architecture Layers

1. **Domain Layer**: Pure business logic, no framework dependencies
2. **Application Layer**: Use cases and application-specific business rules
3. **Infrastructure Layer**: External services (database, authentication)
4. **Presentation Layer**: HTTP controllers and DTOs

### SOLID Principles

- **S**ingle Responsibility: Each class has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Subtypes must be substitutable for their base types
- **I**nterface Segregation: Many specific interfaces over one general interface
- **D**ependency Inversion: Depend on abstractions, not concretions

### Patterns Used

- **Repository Pattern**: Abstracts data access logic
- **Dependency Injection**: Loose coupling between components
- **CQRS**: Separation of commands and queries
- **Value Objects**: Immutable objects representing domain concepts
- **Domain Services**: Business logic that doesn't fit in entities

## 🔒 Security Features

- **Password Hashing**: Using bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Validation**: Input validation using class-validator
- **Error Handling**: Secure error messages without sensitive data
- **Environment Variables**: Sensitive data stored in .env files

## 📝 Technical Decisions

### Why Clean Architecture?

- **Testability**: Business logic can be tested without external dependencies
- **Maintainability**: Clear separation makes code easier to understand and modify
- **Flexibility**: Easy to swap implementations (e.g., change database)
- **Scalability**: Well-organized structure supports growth

### Why DDD?

- **Business Focus**: Code reflects business domain
- **Ubiquitous Language**: Shared vocabulary between developers and domain experts
- **Complex Domain Modeling**: Handles complex business rules effectively

### Why TypeORM?

- **TypeScript Support**: First-class TypeScript integration
- **Migrations**: Version control for database schema
- **Active Record & Data Mapper**: Flexible patterns for data access

## 🐳 Docker Commands

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Rebuild and start
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f app

# Access database
docker-compose exec postgres psql -U postgres -d aura_auth
```

## 🤝 Contributing

1. Follow the existing code structure
2. Write meaningful commit messages
3. Add tests for new features
4. Update documentation as needed
5. Follow TypeScript and NestJS best practices

## 📄 License

MIT

## 👨‍💻 Author

Your Name

---

**Built with ❤️ using NestJS, TypeScript, and Clean Architecture principles**
