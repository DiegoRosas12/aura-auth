# Aura Auth API

Una API RESTful construida con NestJS, TypeScript, Arquitectura Limpia y principios de Domain-Driven Design (DDD). Incluye autenticación JWT, base de datos PostgreSQL y gestión completa de usuarios.

## 📋 Prerequisitos

- Node.js (v18 o superior)
- Docker y Docker Compose
- PostgreSQL (si se ejecuta sin Docker)

## 🛠️ Instalación

### Opción 1: Usando Docker (Recomendado)

1. **Clonar el repositorio**

   ```bash
   cd backend
   ```

2. **Crear archivo `.env`**

   ```bash
   cp .env.example .env
   ```

3. **Iniciar la aplicación**

   ```bash
   docker-compose up --build
   ```

   La API estará disponible en `http://localhost:3000`

### Opción 2: Desarrollo Local

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Crear archivo `.env`**

   ```bash
   cp .env.example .env
   ```

3. **Actualizar `.env` con las credenciales de tu base de datos local**

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=aura_auth
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRATION=1d
   ```

4. **Ejecutar PostgreSQL** (si no usas Docker)

   ```bash
   # Usando Docker solo para PostgreSQL
   docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=aura_auth -p 5432:5432 -d postgres:16-alpine
   ```

5. **Ejecutar migraciones**

   ```bash
   npm run migration:run
   ```

6. **Iniciar el servidor de desarrollo**
   ```bash
   npm run start:dev
   ```

## 🏗️ Arquitectura

Este proyecto sigue los principios de **Arquitectura Limpia** y **Domain-Driven Design (DDD)** con una clara separación de responsabilidades:

```
src/
├── domain/              # Lógica de negocio y reglas (independiente del framework)
│   └── user/
│       ├── entities/           # Entidades del dominio
│       ├── value-objects/      # Objetos de valor inmutables
│       ├── repositories/       # Interfaces de repositorios
│       └── services/           # Servicios del dominio
│
├── application/         # Casos de uso y lógica de aplicación
│   └── user/
│       ├── dtos/              # Objetos de Transferencia de Datos
│       ├── commands/          # Objetos de comando (patrón CQRS)
│       ├── queries/           # Objetos de consulta (patrón CQRS)
│       └── services/          # Servicios de aplicación
│
├── infrastructure/      # Preocupaciones externas (base de datos, seguridad)
│   ├── database/
│   │   ├── entities/          # Entidades TypeORM
│   │   ├── migrations/        # Migraciones de base de datos
│   │   └── database.module.ts
│   ├── repositories/          # Implementaciones de repositorios
│   └── security/              # Estrategia JWT y guards
│
├── presentation/        # Capa HTTP (controladores)
│   └── user/
│       ├── auth.controller.ts
│       ├── user.controller.ts
│       └── dtos/
│
└── shared/             # Utilidades compartidas
    ├── exceptions/
    └── pipes/
```

## 🚀 Características

- ✅ **Arquitectura Limpia** con principios DDD
- ✅ **Autenticación JWT** con Passport
- ✅ **Base de datos PostgreSQL** con TypeORM
- ✅ **Migraciones de Base de Datos** para control de versiones
- ✅ **Validación de Datos** usando class-validator
- ✅ **Manejo de Errores** con filtros de excepciones personalizados
- ✅ **Soporte Docker** con docker-compose
- ✅ **Principios SOLID** y mejores prácticas
- ✅ **TypeScript** para seguridad de tipos

## 📡 Endpoints de la API

### Autenticación

#### Registrar un nuevo usuario

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

**Respuesta:**

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

#### Iniciar sesión

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Respuesta:**

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

### Gestión de Usuarios (Requiere Autenticación)

#### Obtener perfil del usuario actual

```http
GET /api/users/profile
Authorization: Bearer <token>
```

**Respuesta:**

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

#### Actualizar perfil de usuario

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

#### Listar todos los usuarios

```http
GET /api/users
Authorization: Bearer <token>
```

**Respuesta:**

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

## 🔐 Variables de Entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables:

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

⚠️ **Importante:** ¡Cambia `JWT_SECRET` a una cadena fuerte y aleatoria en producción!

## 🗄️ Migraciones de Base de Datos

### Crear una nueva migración

```bash
npm run migration:generate -- src/infrastructure/database/migrations/MigrationName
```

### Ejecutar migraciones

```bash
npm run migration:run
```

### Revertir última migración

```bash
npm run migration:revert
```

## 🧪 Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas E2E
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

## 📦 Scripts del Proyecto

```bash
npm run build          # Construir el proyecto
npm run start          # Iniciar servidor de producción
npm run start:dev      # Iniciar servidor de desarrollo con modo watch
npm run start:debug    # Iniciar con depuración
npm run lint           # Ejecutar ESLint
npm run format         # Formatear código con Prettier
```

## 🏛️ Patrones de Diseño y Principios

### Capas de Arquitectura Limpia

1. **Capa de Dominio**: Lógica de negocio pura, sin dependencias del framework
2. **Capa de Aplicación**: Casos de uso y reglas de negocio específicas de la aplicación
3. **Capa de Infraestructura**: Servicios externos (base de datos, autenticación)
4. **Capa de Presentación**: Controladores HTTP y DTOs

### Principios SOLID

- **S**ingle Responsibility (Responsabilidad Única): Cada clase tiene una sola razón para cambiar
- **O**pen/Closed (Abierto/Cerrado): Abierto para extensión, cerrado para modificación
- **L**iskov Substitution (Sustitución de Liskov): Los subtipos deben ser sustituibles por sus tipos base
- **I**nterface Segregation (Segregación de Interfaces): Muchas interfaces específicas sobre una interfaz general
- **D**ependency Inversion (Inversión de Dependencias): Depender de abstracciones, no de concreciones

### Patrones Utilizados

- **Patrón Repository**: Abstrae la lógica de acceso a datos
- **Inyección de Dependencias**: Acoplamiento flexible entre componentes
- **CQRS**: Separación de comandos y consultas
- **Objetos de Valor**: Objetos inmutables que representan conceptos del dominio
- **Servicios de Dominio**: Lógica de negocio que no encaja en entidades

## 🔒 Características de Seguridad

- **Hash de Contraseñas**: Usando bcrypt con rondas de sal
- **Tokens JWT**: Autenticación segura basada en tokens
- **Validación**: Validación de entrada usando class-validator
- **Manejo de Errores**: Mensajes de error seguros sin datos sensibles
- **Variables de Entorno**: Datos sensibles almacenados en archivos .env

## ⚠️ Manejo de Códigos de Error HTTP

La API utiliza códigos de estado HTTP estándar y un filtro de excepciones global para proporcionar respuestas de error consistentes.

### Códigos de Estado Utilizados

#### 2xx - Éxito
- **200 OK**: Solicitud exitosa (GET, PUT)
- **201 Created**: Recurso creado exitosamente (POST)

#### 4xx - Errores del Cliente

- **400 Bad Request**: Datos de entrada inválidos o reglas de negocio violadas
  - Validación de datos fallida
  - Usuario ya existe (email duplicado)
  - Contraseña no cumple requisitos de seguridad
  
- **401 Unauthorized**: Autenticación fallida o token inválido
  - Credenciales incorrectas
  - Token JWT expirado o inválido
  - Token no proporcionado
  
- **403 Forbidden**: Usuario autenticado pero sin permisos
  - Acceso denegado a recurso
  
- **404 Not Found**: Recurso no encontrado
  - Usuario no existe
  - Endpoint no existe

#### 5xx - Errores del Servidor
- **500 Internal Server Error**: Error inesperado del servidor

### Formato de Respuesta de Error

Todas las respuestas de error siguen el mismo formato estructurado:

```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/auth/register",
  "method": "POST",
  "message": "The user already exists"
}
```

Para errores de validación con múltiples campos:

```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/auth/register",
  "method": "POST",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "constraints": "email must be a valid email address"
    },
    {
      "field": "password",
      "constraints": "password must be at least 8 characters"
    }
  ]
}
```

### Ejemplos de Errores Comunes

#### Registro con Email Duplicado

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "existing@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (400):**
```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/auth/register",
  "method": "POST",
  "message": "The user already exists"
}
```

#### Contraseña Débil

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "weak",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (400):**
```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/auth/register",
  "method": "POST",
  "message": "Password must be at least 8 characters long"
}
```

#### Credenciales Inválidas

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "wrongpassword"
}
```

**Response (401):**
```json
{
  "statusCode": 401,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/auth/login",
  "method": "POST",
  "message": "Invalid credentials"
}
```

#### Token JWT Inválido o Expirado

**Request:**
```http
GET /api/users/profile
Authorization: Bearer invalid_or_expired_token
```

**Response (401):**
```json
{
  "statusCode": 401,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users/profile",
  "method": "GET",
  "message": "Authentication failed"
}
```

### Implementación del Manejo de Errores

El proyecto utiliza:

1. **Excepciones de NestJS**: `BadRequestException`, `UnauthorizedException`, `NotFoundException`, etc.
2. **Filtro Global de Excepciones**: `HttpExceptionFilter` en `src/shared/exception/http-exception.filter.ts`
3. **Validación de Dominio**: Las reglas de negocio en la capa de dominio lanzan errores que son capturados y transformados en excepciones HTTP apropiadas

**Ejemplo de implementación:**

```typescript
// En Application Service
async registerUser(command: RegisterUserCommand) {
  const email = new Email(command.email);
  const existingUser = await this.userRepository.findByEmail(email);
  
  try {
    this.userDomainService.validateUniqueEmail(existingUser, email);
  } catch (error) {
    throw new BadRequestException('The user already exists');
  }
  
  // ... resto del código
}
```

### Reglas de Validación de Contraseña

Las contraseñas deben cumplir los siguientes requisitos:
- Mínimo 8 caracteres
- Al menos una letra mayúscula
- Al menos una letra minúscula
- Al menos un número

Estos requisitos son validados tanto en el backend como en el frontend para proporcionar retroalimentación inmediata al usuario.

## 📝 Decisiones Técnicas

### ¿Por qué Arquitectura Limpia?

- **Testeabilidad**: La lógica de negocio puede probarse sin dependencias externas
- **Mantenibilidad**: La separación clara hace que el código sea más fácil de entender y modificar
- **Flexibilidad**: Fácil de intercambiar implementaciones (ej., cambiar base de datos)
- **Escalabilidad**: Estructura bien organizada que soporta el crecimiento

### ¿Por qué DDD?

- **Enfoque en el Negocio**: El código refleja el dominio del negocio
- **Lenguaje Ubicuo**: Vocabulario compartido entre desarrolladores y expertos del dominio
- **Modelado de Dominio Complejo**: Maneja reglas de negocio complejas de manera efectiva

### ¿Por qué TypeORM?

- **Soporte TypeScript**: Integración de primera clase con TypeScript
- **Migraciones**: Control de versiones para el esquema de base de datos
- **Active Record y Data Mapper**: Patrones flexibles para acceso a datos

## 🐳 Comandos Docker

```bash
# Iniciar servicios
docker-compose up

# Iniciar en modo desacoplado
docker-compose up -d

# Reconstruir e iniciar
docker-compose up --build

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f app

# Acceder a la base de datos
docker-compose exec postgres psql -U postgres -d aura_auth
```

## 🤝 Contribuir

1. Seguir la estructura de código existente
2. Escribir mensajes de commit significativos
3. Añadir pruebas para nuevas características
4. Actualizar la documentación según sea necesario
5. Seguir las mejores prácticas de TypeScript y NestJS

## 📄 Licencia

MIT

## 👨‍💻 Autor

Diego Rosas - [GitHub](https://github.com/diego-rosas)

## 🤝 Contribuir

Si contribuyes al proyecto, por favor, abre un issue o un pull request.

## Siéntete libre de incuir tu nombre en la lista de contribuidores
