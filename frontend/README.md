# Aura Auth - Frontend Application

A modern, production-ready React authentication system built with **Clean Architecture** principles, TypeScript, and TailwindCSS.

## 🎯 Overview

This project implements a complete authentication frontend with user management features, following industry best practices and Clean Architecture patterns for maintainability and scalability.

### Key Features

- ✅ **User Authentication** (Login/Register)
- ✅ **User Profile Management** (View & Edit)
- ✅ **User List View** (Browse all users)
- ✅ **Protected Routes** (Authentication-based access control)
- ✅ **Mock API Mode** (Local development without backend)
- ✅ **Clean Architecture** (Separation of concerns)
- ✅ **TypeScript** (Type safety throughout)
- ✅ **TailwindCSS** (Modern, responsive UI)
- ✅ **Reusable Components** (Atomic design principles)

---

## 📁 Project Structure

```
src/
├── domain/                    # Business logic & entities (innermost layer)
│   ├── entities/             # Core domain models
│   │   └── User.ts          # User entity and DTOs
│   ├── repositories/         # Repository interfaces
│   │   ├── IAuthRepository.ts
│   │   └── UserRepository.ts
│   └── errors/              # Domain errors
│       └── AppError.ts
│
├── infrastructure/           # External services & implementations
│   ├── config/              # Configuration
│   │   └── environment.ts
│   ├── http/                # HTTP client
│   │   └── HttpClient.ts
│   ├── mappers/             # Data transformation
│   │   └── UserMapper.ts
│   ├── repositories/        # Repository implementations
│   │   ├── AuthRepository.ts
│   │   ├── UserRepository.ts
│   │   ├── MockAuthRepository.ts
│   │   └── MockUserRepository.ts
│   └── mock/                # Mock API for testing
│       └── MockApi.ts
│
├── application/             # Use cases & application logic
│   ├── use-cases/          # Business use cases
│   │   ├── auth/
│   │   │   ├── RegisterUseCase.ts
│   │   │   ├── LoginUseCase.ts
│   │   │   └── LogoutUseCase.ts
│   │   └── user/
│   │       ├── GetProfileUseCase.ts
│   │       ├── UpdateProfileUseCase.ts
│   │       └── GetAllUsersUseCase.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useProfile.ts
│   │   └── useUsers.ts
│   ├── context/            # React context providers
│   │   └── AuthContext.tsx
│   └── di/                 # Dependency injection
│       └── container.ts
│
└── presentation/            # UI layer (outermost layer)
    ├── components/
    │   ├── atoms/          # Basic UI elements
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Card.tsx
    │   │   ├── Alert.tsx
    │   │   └── Spinner.tsx
    │   ├── molecules/      # Composite components
    │   │   └── Table.tsx
    │   ├── organisms/      # Complex components
    │   │   └── Navbar.tsx
    │   └── templates/      # Page layouts
    │       ├── AuthLayout.tsx
    │       └── MainLayout.tsx
    ├── pages/              # Page components
    │   ├── LoginPage.tsx
    │   ├── RegisterPage.tsx
    │   ├── DashboardPage.tsx
    │   ├── ProfilePage.tsx
    │   └── UsersPage.tsx
    ├── routes/             # Routing configuration
    │   ├── AppRoutes.tsx
    │   └── ProtectedRoute.tsx
    └── styles/             # Global styles
        └── index.css
```

---

## 🏗️ Clean Architecture Explained

This project follows **Clean Architecture** principles with clear separation of concerns:

### Layer Responsibilities

1. **Domain Layer** (Core Business Logic)
   - Contains pure business logic
   - No dependencies on external frameworks
   - Defines entities, interfaces, and business rules
   - **Independent of UI, database, or external services**

2. **Infrastructure Layer** (External Services)
   - Implements domain interfaces
   - Handles HTTP requests, API calls
   - Data transformation (DTOs ↔ Entities)
   - Mock implementations for testing

3. **Application Layer** (Use Cases)
   - Orchestrates data flow
   - Implements business use cases
   - Coordinates between domain and infrastructure
   - Custom hooks for React integration

4. **Presentation Layer** (UI)
   - React components and pages
   - User interface logic
   - Routing and navigation
   - Depends on application layer only

### Dependency Rule

**Dependencies point inward**: Outer layers depend on inner layers, never the reverse.

```
Presentation → Application → Domain ← Infrastructure
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or npm/yarn
- (Optional) Backend API running on `http://localhost:8000`

### Installation

1. **Clone and navigate to the project**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Configure environment**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_USE_MOCK_API=true  # Set to false when backend is ready
   ```

4. **Start development server**:

   ```bash
   yarn dev
   ```

5. **Open browser**:
   Navigate to `http://localhost:3000`

---

## 📝 Available Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `yarn dev`     | Start development server (port 3000) |
| `yarn build`   | Build for production                 |
| `yarn preview` | Preview production build             |
| `yarn lint`    | Run ESLint                           |
| `yarn format`  | Format code with Prettier            |

---

## 🔌 API Integration

### Endpoints Used

```typescript
POST / api / auth / register // Register new user
POST / api / auth / login // Login user
GET / api / users / profile // Get current user profile
PUT / api / users / profile // Update current user profile
GET / api / users // List all users
```

### Request/Response Examples

**Register**:

```typescript
// Request
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

// Response
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "token": "jwt-token"
}
```

**Login**:

```typescript
// Request
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response (same as register)
```

**Get Profile**:

```typescript
// Request
GET /api/users/profile
Headers: { Authorization: "Bearer jwt-token" }

// Response
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

---

## 🧪 Mock API Mode

For local development without a backend, enable mock mode:

```env
VITE_USE_MOCK_API=true
```

### Mock Users

The mock API includes 3 pre-configured users:

- admin@example.com
- john.doe@example.com
- jane.smith@example.com

**Any password works in mock mode** for demo purposes.

---

## 🎨 Design System

### Color Palette

```css
Primary: #0ea5e9 (Blue)
Secondary: #a855f7 (Purple)
Success: #10b981 (Green)
Error: #ef4444 (Red)
Warning: #f59e0b (Amber)
```

### Component Library

#### Atoms (Basic Components)

- `<Button />` - Multiple variants (primary, secondary, outline, danger)
- `<Input />` - Form input with label and error handling
- `<Card />` - Container with shadow and border
- `<Alert />` - Contextual feedback messages
- `<Spinner />` - Loading indicator

#### Molecules (Composite Components)

- `<Table />` - Responsive data table

#### Organisms (Complex Components)

- `<Navbar />` - Navigation bar with auth state

#### Templates (Layouts)

- `<AuthLayout />` - Centered layout for auth pages
- `<MainLayout />` - Main app layout with navbar

---

## 🔐 Authentication Flow

1. **User visits protected route** → Redirected to login
2. **User logs in** → Token stored in localStorage
3. **Token added to requests** → Via HTTP client interceptor
4. **Session persists** → Token checked on app mount
5. **User logs out** → Token removed, redirected to login

### Protected Routes

All routes except `/login` and `/register` require authentication:

- `/dashboard` - Main dashboard
- `/profile` - User profile management
- `/users` - User list view

---

## 🧩 Adding New Features

### 1. Add a New Entity

```typescript
// src/domain/entities/NewEntity.ts
export interface NewEntity {
  id: string
  name: string
  // ... other fields
}
```

### 2. Create Repository Interface

```typescript
// src/domain/repositories/INewRepository.ts
export interface INewRepository {
  getAll(): Promise<NewEntity[]>
  getById(id: string): Promise<NewEntity>
  // ... other methods
}
```

### 3. Implement Repository

```typescript
// src/infrastructure/repositories/NewRepository.ts
export class NewRepository implements INewRepository {
  async getAll(): Promise<NewEntity[]> {
    return await httpClient.get<NewEntity[]>('/api/new-entities')
  }
  // ... implement other methods
}
```

### 4. Create Use Case

```typescript
// src/application/use-cases/new/GetAllNewEntitiesUseCase.ts
export class GetAllNewEntitiesUseCase {
  constructor(private repository: INewRepository) {}

  async execute(): Promise<NewEntity[]> {
    return await this.repository.getAll()
  }
}
```

### 5. Create Custom Hook

```typescript
// src/application/hooks/useNewEntities.ts
export const useNewEntities = () => {
  const [entities, setEntities] = useState<NewEntity[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchEntities = useCallback(async () => {
    setIsLoading(true)
    const data = await container.getAllNewEntitiesUseCase.execute()
    setEntities(data)
    setIsLoading(false)
  }, [])

  return { entities, isLoading, fetchEntities }
}
```

### 6. Create Page Component

```typescript
// src/presentation/pages/NewEntitiesPage.tsx
export const NewEntitiesPage = () => {
  const { entities, isLoading, fetchEntities } = useNewEntities()

  useEffect(() => {
    fetchEntities()
  }, [fetchEntities])

  return (
    <MainLayout>
      {/* Render entities */}
    </MainLayout>
  )
}
```

### 7. Add Route

```typescript
// src/presentation/routes/AppRoutes.tsx
<Route
  path="/new-entities"
  element={
    <ProtectedRoute>
      <NewEntitiesPage />
    </ProtectedRoute>
  }
/>
```

---

## 🛠️ Development Guidelines

### Code Style

- Use **TypeScript** for all files
- Follow **ESLint** and **Prettier** configurations
- Use **functional components** with hooks
- Prefer **composition** over inheritance
- Keep components **small and focused**

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`)
- **Use Cases**: PascalCase with `UseCase` suffix (`LoginUseCase.ts`)
- **Interfaces**: PascalCase with `I` prefix (`IAuthRepository.ts`)

### Component Guidelines

1. **One component per file**
2. **Export at the bottom** (except default exports)
3. **Props interface above component**
4. **Document complex logic** with comments
5. **Use TypeScript types** everywhere

### State Management

- **Local state**: `useState` for component-specific state
- **Global state**: Context API for auth state
- **Server state**: Custom hooks with use cases

---

## 🧪 Testing Strategy

### Recommended Testing Approach

1. **Unit Tests**: Test use cases and business logic
2. **Integration Tests**: Test repository implementations
3. **Component Tests**: Test React components with React Testing Library
4. **E2E Tests**: Test user flows with Cypress/Playwright

### Example Test Structure

```typescript
// src/application/use-cases/auth/__tests__/LoginUseCase.test.ts
describe('LoginUseCase', () => {
  it('should login user with valid credentials', async () => {
    // Arrange
    const mockRepository = createMockAuthRepository()
    const useCase = new LoginUseCase(mockRepository)

    // Act
    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'password123',
    })

    // Assert
    expect(result.user.email).toBe('test@example.com')
    expect(result.token).toBeDefined()
  })
})
```

---

## 🚢 Deployment

### Build for Production

```bash
yarn build
```

This creates an optimized build in the `dist/` folder.

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_USE_MOCK_API=false
```

### Deploy to Vercel/Netlify

1. Connect your Git repository
2. Set build command: `yarn build`
3. Set output directory: `dist`
4. Add environment variables in dashboard

---

## 📚 Tech Stack

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

### Development Workflow

1. Create a feature branch
2. Make your changes following the architecture
3. Test your changes
4. Run linter: `yarn lint`
5. Format code: `yarn format`
6. Submit pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🆘 Troubleshooting

### Common Issues

**Port 3000 already in use**:

```bash
# Change port in vite.config.ts
server: {
  port: 3001,
}
```

**TypeScript errors after install**:

```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
```

**Mock API not working**:

- Check `.env` file has `VITE_USE_MOCK_API=true`
- Restart dev server after changing `.env`

**Authentication not persisting**:

- Check browser localStorage for `auth_token`
- Ensure cookies/localStorage not blocked

---

## 📞 Support

For questions or issues:

- Check the documentation above
- Review the code comments
- Examine the example implementations

---

**Built with ❤️ using Clean Architecture principles**
