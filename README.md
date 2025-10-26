# 🔐 Aura Auth - Authentication System

> **Live Playground**: [Aura Auth - Authentication System](https://aura-auth-playground.example.com)

A complete, production-ready authentication system built with modern technologies and best practices. This monorepo contains both a NestJS backend API and a React frontend application, following Clean Architecture and Domain-Driven Design principles.

---

## 📚 Documentation

This README provides an overview of the entire system. For detailed documentation on each component:

- **[Backend Documentation](./backend/README.md)** - NestJS API with Clean Architecture and DDD
- **[Frontend Documentation](./frontend/README.md)** - React application with Clean Architecture

---

## 🎯 Overview

Aura Auth is a full-stack authentication system that demonstrates enterprise-level architecture patterns and best practices. It includes:

- **Backend**: RESTful API built with NestJS, TypeScript, PostgreSQL, and JWT authentication
- **Frontend**: Modern React SPA with TypeScript, TailwindCSS, and responsive design
- **Architecture**: Both projects follow Clean Architecture principles with clear separation of concerns
- **Security**: Industry-standard security practices including password hashing, JWT tokens, and input validation

---

## Project Assumptions

- The user needs a register section to add a new user and set a password.
- There is a companies search section to find a company by name. The public api of autocomplete.clearbit.com is used to search for companies and add them to the favorites list.
- Even if the design is not provided, the screens for user list view and edit profile are available.
- A logout button is needed.
- The password needs a basic security level so is required to have at least 8 characters, one uppercase letter and one lowercase letter.
- The user can only edit their own profile.

--

## ✨ Features

### Backend Features

- ✅ JWT-based authentication with Passport
- ✅ User registration and login
- ✅ User profile management
- ✅ PostgreSQL database with TypeORM
- ✅ Database migrations for version control
- ✅ Clean Architecture with DDD principles
- ✅ SOLID principles and design patterns
- ✅ Comprehensive error handling
- ✅ Docker support with docker-compose
- ✅ Input validation with class-validator

### Frontend Features

- ✅ User authentication (Login/Register)
- ✅ User profile management (View & Edit)
- ✅ User list view
- ✅ Protected routes with authentication
- ✅ Mock API mode for local development
- ✅ Clean Architecture implementation
- ✅ TypeScript for type safety
- ✅ Modern UI with TailwindCSS
- ✅ Reusable component library (Atomic design)
- ✅ Responsive design

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose** (recommended)
- **PostgreSQL** (if running without Docker)
- **npm** or **yarn** package manager

### Running the Complete System

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/aura-auth.git
   cd aura-auth
   ```

2. **Backend Setup:**

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Start PostgreSQL (if not using Docker)
docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=aura_auth -p 5432:5432 -d postgres:16-alpine

# Run migrations
npm run migration:run

# Start development server
npm run start:dev
```

3. **Start the frontend** (in a new terminal)

```bash
cd frontend

# Install dependencies
yarn install

# Configure environment
cp .env.example .env
# Edit .env:
# VITE_API_BASE_URL=http://localhost:3000
# VITE_USE_MOCK_API=false

# Start development server
yarn dev
```

## Frontend will be available at `http://localhost:3000`

## 🏗️ Architecture

Both the backend and frontend follow **Clean Architecture** principles with clear separation of concerns:

### Backend Architecture

```
src/
├── domain/              # Business logic and rules (framework-independent)
│   ├── entities/        # Domain entities
│   ├── value-objects/   # Immutable value objects
│   ├── repositories/    # Repository interfaces
│   └── services/        # Domain services
│
├── application/         # Use cases and application logic
│   ├── dtos/           # Data Transfer Objects
│   ├── commands/       # Command objects (CQRS)
│   ├── queries/        # Query objects (CQRS)
│   └── services/       # Application services
│
├── infrastructure/      # External concerns (database, security)
│   ├── database/       # TypeORM entities and migrations
│   ├── repositories/   # Repository implementations
│   └── security/       # JWT strategy and guards
│
└── presentation/        # HTTP layer (controllers)
    └── controllers/    # REST API controllers
```

### Frontend Architecture

```
src/
├── domain/              # Business logic & entities (innermost layer)
│   ├── entities/       # Core domain models
│   ├── repositories/   # Repository interfaces
│   └── errors/         # Domain errors
│
├── infrastructure/      # External services & implementations
│   ├── http/           # HTTP client
│   ├── repositories/   # Repository implementations
│   └── mock/           # Mock API for testing
│
├── application/         # Use cases & application logic
│   ├── use-cases/      # Business use cases
│   ├── hooks/          # Custom React hooks
│   └── context/        # React context providers
│
└── presentation/        # UI layer (outermost layer)
    ├── components/     # React components (Atomic design)
    ├── pages/          # Page components
    └── routes/         # Routing configuration
```

### Dependency Rule

**Dependencies point inward**: Outer layers depend on inner layers, never the reverse.

```
Presentation → Application → Domain ← Infrastructure
```

This ensures:

- **Testability**: Business logic can be tested without external dependencies
- **Flexibility**: Easy to swap implementations (e.g., change database)
- **Maintainability**: Clear separation makes code easier to understand and modify
- **Scalability**: Well-organized structure supports growth

---

## 🎨 Best Practices Used

### Architecture & Design Patterns

1. **Clean Architecture**

   - Clear separation of concerns across layers
   - Business logic independent of frameworks
   - Dependency inversion principle

2. **Domain-Driven Design (DDD)**

   - Domain entities and value objects
   - Repository pattern for data access
   - Domain services for business logic
   - Ubiquitous language between developers and domain experts

3. **SOLID Principles**

   - **S**ingle Responsibility: Each class has one reason to change
   - **O**pen/Closed: Open for extension, closed for modification
   - **L**iskov Substitution: Subtypes must be substitutable for their base types
   - **I**nterface Segregation: Many specific interfaces over one general interface
   - **D**ependency Inversion: Depend on abstractions, not concretions

4. **Design Patterns**
   - Repository Pattern: Abstracts data access logic
   - Dependency Injection: Loose coupling between components
   - CQRS: Separation of commands and queries
   - Value Objects: Immutable objects representing domain concepts
   - Factory Pattern: Object creation logic

### Code Quality

5. **TypeScript**

   - Type safety throughout the codebase
   - Interfaces for contracts
   - Strict mode enabled

6. **Code Organization**

   - Modular structure
   - Atomic design for UI components
   - Clear naming conventions
   - Single responsibility per file

7. **Testing Strategy**
   - Unit tests for business logic
   - Integration tests for repositories
   - E2E tests for critical flows
   - Mock implementations for testing

### Security

8. **Authentication & Authorization**

   - JWT-based authentication
   - Password hashing with bcrypt
   - Secure token storage
   - Protected routes

9. **Input Validation**

   - Server-side validation with class-validator
   - Client-side validation for UX
   - Sanitization of user inputs
   - Type checking with TypeScript

10. **Error Handling**
    - Global exception filters
    - Consistent error responses
    - No sensitive data in error messages
    - Proper HTTP status codes

### Development Workflow

11. **Version Control**

    - Git for source control
    - Meaningful commit messages
    - Feature branch workflow

12. **Environment Configuration**

    - Environment variables for sensitive data
    - Separate configs for dev/prod
    - .env.example files for documentation

13. **Code Formatting**

    - ESLint for code linting
    - Prettier for code formatting
    - Consistent code style

14. **Database Management**

    - Database migrations for version control
    - TypeORM for type-safe queries
    - Connection pooling

15. **Documentation**
    - Comprehensive README files
    - Code comments for complex logic
    - API documentation with examples
    - Architecture diagrams

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | No            |
| POST   | `/api/auth/login`    | Login user        | No            |

### User Management

| Method | Endpoint             | Description              | Auth Required |
| ------ | -------------------- | ------------------------ | ------------- |
| GET    | `/api/users/profile` | Get current user profile | Yes           |
| PUT    | `/api/users/profile` | Update user profile      | Yes           |
| GET    | `/api/users`         | List all users           | Yes           |

For detailed API documentation with request/response examples, see the [Backend README](./backend/README.md).

---

## 🔐 Environment Variables

### Backend (.env)

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

### Frontend (.env)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK_API=false
```

⚠️ **Security Note**: Always use strong, random secrets in production and never commit `.env` files to version control.

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Frontend Tests

```bash
cd frontend

# Run tests (when implemented)
yarn test

# Test coverage
yarn test:coverage
```

---

## 📦 Available Scripts

### Backend

| Command                    | Description                              |
| -------------------------- | ---------------------------------------- |
| `npm run start:dev`        | Start development server with watch mode |
| `npm run build`            | Build for production                     |
| `npm run start`            | Start production server                  |
| `npm run migration:run`    | Run database migrations                  |
| `npm run migration:revert` | Revert last migration                    |
| `npm run lint`             | Run ESLint                               |
| `npm run format`           | Format code with Prettier                |

### Frontend

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `yarn dev`     | Start development server (port 3000) |
| `yarn build`   | Build for production                 |
| `yarn preview` | Preview production build             |
| `yarn lint`    | Run ESLint                           |
| `yarn format`  | Format code with Prettier            |

---

## 📚 Tech Stack

### Backend

| Technology          | Purpose            |
| ------------------- | ------------------ |
| **NestJS**          | Node.js framework  |
| **TypeScript**      | Type safety        |
| **PostgreSQL**      | Database           |
| **TypeORM**         | ORM and migrations |
| **Passport**        | Authentication     |
| **JWT**             | Token-based auth   |
| **bcrypt**          | Password hashing   |
| **class-validator** | Input validation   |
| **Docker**          | Containerization   |

### Frontend

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| **React 18**     | UI library              |
| **TypeScript**   | Type safety             |
| **Vite**         | Build tool & dev server |
| **TailwindCSS**  | Utility-first CSS       |
| **React Router** | Client-side routing     |
| **Axios**        | HTTP client             |
| **ESLint**       | Code linting            |
| **Prettier**     | Code formatting         |

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Follow the existing architecture** - Maintain Clean Architecture principles
2. **Write meaningful commit messages** - Use conventional commits format
3. **Add tests** for new features
4. **Update documentation** as needed
5. **Follow code style** - Run linter and formatter before committing
6. **Keep PRs focused** - One feature/fix per pull request

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the architecture
4. Run tests and linters
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Diego Rosas** - [GitHub](https://github.com/diego-rosas)

---

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**

- Backend: Change `PORT` in backend `.env`
- Frontend: Change port in `vite.config.ts`

**Database connection failed:**

- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify `DB_HOST` (use `localhost` for local, `postgres` for Docker)

**Frontend can't connect to backend:**

- Verify backend is running on correct port
- Check `VITE_API_BASE_URL` in frontend `.env`
- Ensure CORS is properly configured

**Authentication not working:**

- Check JWT_SECRET is set in backend `.env`
- Verify token is being stored in localStorage
- Check browser console for errors

---

## 📞 Support

For questions, issues, or feature requests:

- Check the documentation in this README and component-specific READMEs
- Review the code comments and examples
- Open an issue on GitHub
- Contact the maintainers

---

## 🙏 Acknowledgments

This project demonstrates modern software engineering practices and serves as a reference implementation for:

- Clean Architecture in full-stack applications
- Domain-Driven Design principles
- SOLID principles and design patterns
- Secure authentication systems
- TypeScript best practices

Feel free to use this project as a learning resource or starting point for your own applications.

---

**Built with ❤️ by Diego Rosas**
