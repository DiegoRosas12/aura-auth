# Aura Auth - Aplicación Frontend

Un sistema de autenticación moderno en React listo para producción, construido con principios de **Arquitectura Limpia**, TypeScript, TailwindCSS y Chakra UI.

## 🎯 Descripción General

Este proyecto implementa un frontend completo de autenticación con características de gestión de usuarios, siguiendo las mejores prácticas de la industria y patrones de Arquitectura Limpia para mantenibilidad y escalabilidad.

### Características Principales

- ✅ **Autenticación de Usuario** (Inicio de sesión/Registro)
- ✅ **Gestión de Perfil de Usuario** (Ver y Editar)
- ✅ **Vista de Lista de Usuarios** (Explorar todos los usuarios)
- ✅ **Rutas Protegidas** (Control de acceso basado en autenticación)
- ✅ **Modo API Simulada** (Desarrollo local sin backend)
- ✅ **Arquitectura Limpia** (Separación de responsabilidades)
- ✅ **TypeScript** (Seguridad de tipos en todo el código)
- ✅ **TailwindCSS & Chakra UI** (UI moderna y responsiva)
- ✅ **Componentes Reutilizables** (Principios de diseño atómico)

---

## 📁 Estructura del Proyecto

```
src/
├── domain/                    # Lógica de negocio y entidades (capa más interna)
│   ├── entity/               # Modelos del dominio central
│   │   └── User.ts          # Entidad de usuario y DTOs
│   ├── repository/           # Interfaces de repositorio
│   │   ├── IAuthRepository.ts
│   │   └── IUserRepository.ts
│   ├── service/              # Servicios del dominio
│   │   └── UserValidationService.ts
│   ├── validation/           # Esquemas de validación
│   │   └── authSchemas.ts
│   └── error/                # Errores del dominio
│       └── AppError.ts
│
├── infrastructure/           # Servicios externos e implementaciones
│   ├── config/              # Configuración
│   │   └── environment.ts
│   ├── http/                # Cliente HTTP
│   │   └── HttpClient.ts
│   ├── mapper/              # Transformación de datos
│   │   └── UserMapper.ts
│   ├── repository/          # Implementaciones de repositorio
│   │   ├── AuthRepository.ts
│   │   ├── UserRepository.ts
│   │   ├── MockAuthRepository.ts
│   │   └── MockUserRepository.ts
│   └── storage/             # Almacenamiento local
│       └── TokenStorage.ts
│
├── application/             # Casos de uso y lógica de aplicación
│   ├── use-cases/          # Casos de uso de negocio
│   │   ├── auth/
│   │   │   ├── RegisterUseCase.ts
│   │   │   ├── LoginUseCase.ts
│   │   │   └── LogoutUseCase.ts
│   │   └── user/
│   │       ├── GetProfileUseCase.ts
│   │       ├── UpdateProfileUseCase.ts
│   │       └── GetAllUsersUseCase.ts
│   ├── hooks/              # Hooks personalizados de React
│   │   ├── useAuth.ts
│   │   ├── useProfile.ts
│   │   └── useUsers.ts
│   ├── context/            # Proveedores de contexto de React
│   │   └── AuthContext.tsx
│   └── di/                 # Inyección de dependencias
│       └── container.ts
│
└── presentation/            # Capa de UI (capa más externa)
    ├── components/         # Componentes React reutilizables
    │   ├── AuthLayout.tsx
    │   ├── MainLayout.tsx
    │   ├── Navbar.tsx
    │   ├── Sidebar.tsx
    │   ├── Spinner.tsx
    │   └── ...
    ├── page/              # Componentes de página
    │   ├── LoginPage.tsx
    │   ├── RegisterPage.tsx
    │   ├── DashboardPage.tsx
    │   ├── ProfilePage.tsx
    │   ├── UsersPage.tsx
    │   └── UploadDataPage.tsx
    ├── route/             # Configuración de rutas
    │   ├── AppRoutes.tsx
    │   └── ProtectedRoute.tsx
    └── styles/            # Estilos globales
        └── index.css
```

---

## 🏗️ Arquitectura

### Decisiones de arquitectura y técnicas

- No implementar entidades de dominio a diferencia del backend debido a que la lógica de negocio es simple y no lo requiere.
- Implementar una libreria de componentes que en este caso es Chakra UI para evitar crear componentes desde cero donde sea posible.
- Separar componentes para mejorar la reutilización y la mantenibilidad.
- Se decidio no utlizar la separación atómica de componentes (atom, molecule, organism) para evitar la complejidad innecesaria para las caracteristicas del proyecto.
- Proteger rutas con el uso de un proveedor de contexto de React.
- Implementar un enrutador de React para manejar las rutas de la aplicación.
- Validación de entrada con Zod.

Este proyecto sigue los principios de **Arquitectura Limpia** con clara separación de responsabilidades:

### Responsabilidades de las Capas

1. **Capa de Dominio** (Lógica de Negocio Central)
   - Contiene lógica de negocio pura
   - Sin dependencias en frameworks externos
   - Define entidades, interfaces y reglas de negocio
   - **Independiente de UI, base de datos o servicios externos**

2. **Capa de Infraestructura** (Servicios Externos)
   - Implementa interfaces del dominio
   - Maneja peticiones HTTP, llamadas a API
   - Transformación de datos (DTOs ↔ Entidades)
   - Implementaciones simuladas para pruebas

3. **Capa de Aplicación** (Casos de Uso)
   - Orquesta el flujo de datos
   - Implementa casos de uso de negocio
   - Coordina entre dominio e infraestructura
   - Hooks personalizados para integración con React

4. **Capa de Presentación** (UI)
   - Componentes y páginas de React
   - Lógica de interfaz de usuario
   - Enrutamiento y navegación
   - Depende solo de la capa de aplicación

### Regla de Dependencias

**Las dependencias apuntan hacia adentro**: Las capas externas dependen de las capas internas, nunca al revés.

```
Presentación → Aplicación → Dominio ← Infraestructura
```

---

## 🚀 Comenzando

### Requisitos Previos

- Node.js 18+ o npm/yarn
- (Opcional) API Backend ejecutándose en `http://localhost:3000`

### Instalación

1. **Clonar y navegar al proyecto**:

   ```bash
   cd frontend
   ```

2. **Instalar dependencias**:

   ```bash
   yarn install
   ```

3. **Configurar entorno**:

   ```bash
   cp .env.example .env
   ```

   Editar `.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_USE_MOCK_API=true  # Cambiar a false cuando el backend esté listo
   ```

4. **Iniciar servidor de desarrollo**:

   ```bash
   yarn dev
   ```

5. **Abrir navegador**:
   Navegar a `http://localhost:3000`

---

## 📝 Scripts Disponibles

| Comando        | Descripción                                  |
| -------------- | -------------------------------------------- |
| `yarn dev`     | Iniciar servidor de desarrollo (puerto 5173) |
| `yarn build`   | Compilar para producción                     |
| `yarn preview` | Vista previa de compilación de producción    |
| `yarn lint`    | Ejecutar ESLint                              |
| `yarn format`  | Formatear código con Prettier                |

---

## 🎨 Sistema de Diseño

### Biblioteca de Componentes

El proyecto utiliza **Chakra UI** como biblioteca principal de componentes, complementada con componentes personalizados:

#### Componentes Personalizados

- `<AuthLayout />` - Layout centrado para páginas de autenticación
- `<MainLayout />` - Layout principal de la aplicación con sidebar
- `<Sidebar />` - Barra lateral de navegación
- `<Navbar />` - Barra de navegación superior
- `<Spinner />` - Indicador de carga personalizado

#### Componentes de Chakra UI

- Botones, Inputs, Cards, Alerts, Tables, etc.
- Sistema de diseño consistente y accesible
- Modo responsivo integrado

---

## 🔐 Flujo de Autenticación

1. **Usuario visita ruta protegida** → Redirigido a inicio de sesión
2. **Usuario inicia sesión** → Token almacenado en localStorage
3. **Token agregado a peticiones** → Vía interceptor del cliente HTTP
4. **Sesión persiste** → Token verificado al montar la aplicación
5. **Usuario cierra sesión** → Token eliminado, redirigido a inicio de sesión

### Rutas Protegidas

Todas las rutas excepto `/login` y `/register` requieren autenticación:

- `/dashboard` - Panel principal
- `/profile` - Gestión de perfil de usuario
- `/users` - Vista de lista de usuarios
- `/upload-data` - Carga de datos
- `/search-data` - Búsqueda de datos
- `/ask-ai` - Consultas a IA

---

## 🧩 Agregar Nuevas Características

### 1. Agregar una Nueva Entidad

```typescript
// src/domain/entity/NewEntity.ts
export interface NewEntity {
  id: string
  name: string
  // ... otros campos
}
```

### 2. Crear Interfaz de Repositorio

```typescript
// src/domain/repository/INewRepository.ts
export interface INewRepository {
  getAll(): Promise<NewEntity[]>
  getById(id: string): Promise<NewEntity>
  // ... otros métodos
}
```

### 3. Implementar Repositorio

```typescript
// src/infrastructure/repository/NewRepository.ts
export class NewRepository implements INewRepository {
  async getAll(): Promise<NewEntity[]> {
    return await httpClient.get<NewEntity[]>('/api/new-entities')
  }
  // ... implementar otros métodos
}
```

### 4. Crear Caso de Uso

```typescript
// src/application/use-cases/new/GetAllNewEntitiesUseCase.ts
export class GetAllNewEntitiesUseCase {
  constructor(private repository: INewRepository) {}

  async execute(): Promise<NewEntity[]> {
    return await this.repository.getAll()
  }
}
```

### 5. Crear Hook Personalizado

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

### 6. Crear Componente de Página

```typescript
// src/presentation/page/NewEntitiesPage.tsx
export const NewEntitiesPage = () => {
  const { entities, isLoading, fetchEntities } = useNewEntities()

  useEffect(() => {
    fetchEntities()
  }, [fetchEntities])

  return (
    <MainLayout>
      {/* Renderizar entidades */}
    </MainLayout>
  )
}
```

### 7. Agregar Ruta

```typescript
// src/presentation/route/AppRoutes.tsx
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

## 🛠️ Guías de Desarrollo

### Estilo de Código

- Usar **TypeScript** para todos los archivos
- Seguir configuraciones de **ESLint** y **Prettier**
- Usar **componentes funcionales** con hooks
- Preferir **composición** sobre herencia
- Mantener componentes **pequeños y enfocados**

### Convenciones de Nomenclatura

- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useAuth.ts`)
- **Casos de Uso**: PascalCase con sufijo `UseCase` (`LoginUseCase.ts`)
- **Interfaces**: PascalCase con prefijo `I` (`IAuthRepository.ts`)

### Guías de Componentes

1. **Un componente por archivo**
2. **Exportar al final** (excepto exportaciones por defecto)
3. **Interfaz de props arriba del componente**
4. **Documentar lógica compleja** con comentarios
5. **Usar tipos de TypeScript** en todas partes

### Gestión de Estado

- **Estado local**: `useState` para estado específico del componente
- **Estado global**: Context API para estado de autenticación
- **Estado del servidor**: Hooks personalizados con casos de uso

---

## 🧪 Estrategia de Pruebas

### Enfoque de Pruebas Recomendado

1. **Pruebas Unitarias**: Probar casos de uso y lógica de negocio
2. **Pruebas de Integración**: Probar implementaciones de repositorio
3. **Pruebas de Componentes**: Probar componentes React con React Testing Library
4. **Pruebas E2E**: Probar flujos de usuario con Cypress/Playwright

---

## 🚢 Despliegue

### Compilar para Producción

```bash
yarn build
```

Esto crea una compilación optimizada en la carpeta `dist/`.

### Variables de Entorno para Producción

```env
VITE_API_BASE_URL=https://api.tudominio.com
VITE_USE_MOCK_API=false
```

### Desplegar en Vercel/Netlify

1. Conectar tu repositorio Git
2. Establecer comando de compilación: `yarn build`
3. Establecer directorio de salida: `dist`
4. Agregar variables de entorno en el panel

---

## 📚 Stack Tecnológico

| Tecnología          | Propósito                  |
| ------------------- | -------------------------- |
| **React 18**        | Biblioteca UI              |
| **TypeScript**      | Seguridad de tipos         |
| **Vite**            | Herramienta de compilación |
| **TailwindCSS**     | CSS utility-first          |
| **Chakra UI**       | Biblioteca de componentes  |
| **React Router**    | Enrutamiento del cliente   |
| **Axios**           | Cliente HTTP               |
| **React Hook Form** | Gestión de formularios     |
| **Zod**             | Validación de esquemas     |
| **ESLint**          | Linting de código          |
| **Prettier**        | Formato de código          |

---

## 🆘 Solución de Problemas

### Problemas Comunes

**Puerto 5173 ya en uso**:

```bash
# Cambiar puerto en vite.config.ts
server: {
  port: 3001,
}
```

**Errores de TypeScript después de instalar**:

```bash
# Limpiar caché y reinstalar
rm -rf node_modules yarn.lock
yarn install
```

**API simulada no funciona**:

- Verificar que el archivo `.env` tenga `VITE_USE_MOCK_API=true`
- Reiniciar servidor de desarrollo después de cambiar `.env`

**Autenticación no persiste**:

- Verificar localStorage del navegador para `auth_token`
- Asegurar que cookies/localStorage no estén bloqueadas

---

## 📞 Soporte

Para preguntas o problemas:

- Consultar la documentación anterior
- Revisar los comentarios del código
- Examinar las implementaciones de ejemplo

---

**Construido con ❤️ usando principios de Arquitectura Limpia**
