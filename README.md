# 🔐 Aura Auth - Sistema de Autenticación

> **Demostración en Vivo**: [Aura Auth - Sistema de Autenticación](https://auraauth.netlify.app)

Un sistema de autenticación completo y listo para producción construido con tecnologías modernas y mejores prácticas. Este monorepo contiene tanto una API backend en NestJS como una aplicación frontend en React, siguiendo los principios de Arquitectura Limpia y Diseño Dirigido por el Dominio.

---

## 📚 Documentación

Este README proporciona una visión general de todo el sistema. Para documentación detallada de cada componente:

- **[Documentación del Backend](./backend/README.md)** - API NestJS con Arquitectura Limpia y DDD
- **[Documentación del Frontend](./frontend/README.md)** - Aplicación React con Arquitectura Limpia

---

## 🎯 Descripción General

Aura Auth es un sistema de autenticación full-stack que demuestra patrones de arquitectura y mejores prácticas de nivel empresarial. Incluye:

- **Backend**: API RESTful construida con NestJS, TypeScript, PostgreSQL y autenticación JWT
- **Frontend**: SPA moderna en React con TypeScript, TailwindCSS y diseño responsivo
- **Arquitectura**: Ambos proyectos siguen los principios de Arquitectura Limpia con clara separación de responsabilidades
- **Seguridad**: Prácticas de seguridad estándar de la industria incluyendo hash de contraseñas, tokens JWT y validación de entrada

---

## Suposiciones del Proyecto

- El usuario necesita una sección de registro para agregar un nuevo usuario y establecer una contraseña.
- Existe una sección de búsqueda de empresas para encontrar una empresa por nombre. Se utiliza la API pública de autocomplete.clearbit.com para buscar empresas y agregarlas a la lista de favoritos.
- Aunque no se proporcione el diseño, están disponibles las pantallas para la vista de lista de usuarios y edición de perfil.
- Se necesita un botón de cierre de sesión.
- La contraseña necesita un nivel básico de seguridad, por lo que se requiere que tenga al menos 8 caracteres, una letra mayúscula y una letra minúscula.
- El usuario solo puede editar su propio perfil.
- Se realizó el mock de las secciones de busqueda y chat para que puedan ser completadas en un futuro.

---

### 🏗️ Decisiones de arquitectura y técnicas del frontend

- No implementar entidades de dominio a diferencia del backend debido a que la lógica de negocio es simple y no lo requiere.
- Implementar una libreria de componentes que en este caso es Chakra UI para evitar crear componentes desde cero donde sea posible.
- Separar componentes para mejorar la reutilización y la mantenibilidad.
- Se decidio no utlizar la separación atómica de componentes (atom, molecule, organism) para evitar la complejidad innecesaria para las caracteristicas del proyecto.
- Proteger rutas con el uso de un proveedor de contexto de React.
- Implementar un enrutador de React para manejar las rutas de la aplicación.
- Validación de entrada con Zod.

### 🏗️ Decisiones de arquitectura y técnicas del backend

- **Arquitectura Limpia** y **Domain-Driven Design (DDD)** con una clara separación de responsabilidades.

- Usar entidades del dominio en lugar de DTOs para el manejo de validaciones de negocio como requerimientos de especificaciones en la contraseña por ejemplo.

- Usar interfaces de repositorio para la capa de infraestructura para separar la lógica de la base de datos de la lógica de negocio.

- Usar filtros de excepciones personalizados para manejar errores de manera consistente.

- Uso de un unico application service en lugar de use cases separados debido a que el numero de acciones es manejable y todos estan relacionados con el manejo de usuarios.

- Uso de migraciones para poder inicializar fácilmente la base de datos sin uso de scripts adicionales. Facilitó su manejo en CI.

## ✨ Características

### Características del Backend

- ✅ Autenticación basada en JWT con Passport
- ✅ Registro e inicio de sesión de usuarios
- ✅ Gestión de perfil de usuario
- ✅ Base de datos PostgreSQL con TypeORM
- ✅ Migraciones de base de datos para control de versiones
- ✅ Arquitectura Limpia con principios DDD
- ✅ Principios SOLID y patrones de diseño
- ✅ Manejo integral de errores
- ✅ Validación de entrada con class-validator

### Características del Frontend

- ✅ Autenticación de usuario (Inicio de sesión/Registro)
- ✅ Gestión de perfil de usuario (Ver y Editar)
- ✅ Vista de lista de usuarios
- ✅ Rutas protegidas con autenticación
- ✅ Modo API simulada para desarrollo local
- ✅ Implementación de Arquitectura Limpia
- ✅ TypeScript para seguridad de tipos
- ✅ UI moderna con TailwindCSS
- ✅ Uso de componentes de Chakra UI
- ✅ Biblioteca de componentes reutilizables (Diseño atómico)
- ✅ Diseño responsivo

---

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js** (v18 o superior)
- **Docker** y **Docker Compose** (recomendado)
- **PostgreSQL** (si se ejecuta sin Docker)
- Gestor de paquetes **npm** o **yarn**

### Ejecutar el Sistema Completo

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/yourusername/aura-auth.git
   cd aura-auth
   ```

2. **Configuración del Backend:**

```bash
cd backend

# Instalar dependencias
npm install

# Configurar entorno
cp .env.example .env
# Editar .env con tus credenciales de base de datos

# Iniciar PostgreSQL (si no usas Docker)
docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=aura_auth -p 5432:5432 -d postgres:16-alpine

# Ejecutar migraciones
npm run migration:run

# Iniciar servidor de desarrollo
npm run start:dev
```

3. **Iniciar el frontend** (en una nueva terminal)

```bash
cd frontend

# Instalar dependencias
yarn install

# Configurar entorno
cp .env.example .env
# Editar .env:
# VITE_API_BASE_URL=http://localhost:3000
# VITE_USE_MOCK_API=false

# Iniciar servidor de desarrollo
yarn dev
```

## El Frontend estará disponible en `http://localhost:3000`

## 🏗️ Arquitectura

Tanto el backend como el frontend siguen los principios de **Arquitectura Limpia** con clara separación de responsabilidades:

### Arquitectura del Backend

```
src/
├── domain/              # Lógica de negocio y reglas (independiente del framework)
│   └── user/
│       ├── entity/          # Entidades del dominio
│       ├── repository/      # Interfaces de repositorio
│       └── value-object/    # Objetos de valor
│
├── application/         # Casos de uso y lógica de aplicación
│   └── user/
│       ├── dto/            # Objetos de Transferencia de Datos
│       └── service/        # Servicios de aplicación
│
├── infrastructure/      # Preocupaciones externas (base de datos, seguridad)
│   └── user/
│       ├── database/       # Entidades TypeORM y migraciones
│       └── security/       # Estrategia JWT y guards
│
├── presentation/        # Capa HTTP (controladores)
│   └── user/
│       ├── dto/            # DTOs de presentación
│       └── *.controller.ts # Controladores de API REST
│
└── shared/              # Código compartido entre módulos
```

### Arquitectura del Frontend

```
src/
├── domain/              # Lógica de negocio y entidades (capa más interna)
│   ├── entity/         # Modelos del dominio central
│   ├── repository/     # Interfaces de repositorio
│   ├── service/        # Servicios del dominio
│   ├── validation/     # Esquemas de validación
│   └── error/          # Errores del dominio
│
├── infrastructure/      # Servicios externos e implementaciones
│   ├── http/           # Cliente HTTP
│   ├── repository/     # Implementaciones de repositorio
│   ├── mapper/         # Mappers de datos
│   ├── storage/        # Almacenamiento local
│   └── config/         # Configuración
│
├── application/         # Casos de uso y lógica de aplicación
│   ├── use-cases/      # Casos de uso de negocio
│   ├── hooks/          # Hooks personalizados de React
│   ├── context/        # Proveedores de contexto de React
│   └── di/             # Inyección de dependencias
│
└── presentation/        # Capa de UI (capa más externa)
    ├── components/     # Componentes React reutilizables
    ├── page/           # Componentes de página
    ├── route/          # Configuración de enrutamiento
    └── styles/         # Estilos globales
```

### Regla de Dependencias

**Las dependencias apuntan hacia adentro**: Las capas externas dependen de las capas internas, nunca al revés.

```
Presentación → Aplicación → Dominio ← Infraestructura
```

Esto asegura:

- **Testabilidad**: La lógica de negocio puede probarse sin dependencias externas
- **Flexibilidad**: Fácil intercambio de implementaciones (ej. cambiar base de datos)
- **Mantenibilidad**: La separación clara hace que el código sea más fácil de entender y modificar
- **Escalabilidad**: La estructura bien organizada soporta el crecimiento

---

## 🎨 Mejores Prácticas Utilizadas

### Arquitectura y Patrones de Diseño

1. **Arquitectura Limpia**

   - Clara separación de responsabilidades entre capas
   - Lógica de negocio independiente de frameworks
   - Principio de inversión de dependencias

2. **Diseño Dirigido por el Dominio (DDD)**

   - Entidades y objetos de valor del dominio
   - Patrón Repository para acceso a datos
   - Servicios de dominio para lógica de negocio
   - Lenguaje ubicuo entre desarrolladores y expertos del dominio

3. **Principios SOLID**

   - **S**ingle Responsibility: Cada clase tiene una razón para cambiar
   - **O**pen/Closed: Abierto para extensión, cerrado para modificación
   - **L**iskov Substitution: Los subtipos deben ser sustituibles por sus tipos base
   - **I**nterface Segregation: Muchas interfaces específicas sobre una general
   - **D**ependency Inversion: Depender de abstracciones, no de concreciones

4. **Patrones de Diseño**
   - Patrón Repository: Abstrae la lógica de acceso a datos
   - Inyección de Dependencias: Bajo acoplamiento entre componentes
   - DTOs (Objetos de Transferencia de Datos): Validación y transferencia de datos entre capas

### Calidad del Código

5. **TypeScript**

   - Seguridad de tipos en toda la base de código
   - Interfaces para contratos
   - Modo estricto habilitado

6. **Organización del Código**

   - Estructura modular
   - Diseño atómico para componentes UI
   - Convenciones de nomenclatura claras
   - Responsabilidad única por archivo

7. **Estrategia de Pruebas**
   - Pruebas unitarias para lógica de negocio
   - Pruebas de integración para repositorios
   - Pruebas E2E para flujos críticos
   - Implementaciones simuladas para pruebas

### Seguridad

8. **Autenticación y Autorización**

   - Autenticación basada en JWT
   - Hash de contraseñas con bcrypt
   - Almacenamiento seguro de tokens
   - Rutas protegidas

9. **Validación de Entrada**

   - Validación del lado del servidor con class-validator
   - Validación del lado del cliente para UX
   - Sanitización de entradas de usuario
   - Verificación de tipos con TypeScript

10. **Manejo de Errores**
    - Filtros de excepción globales
    - Respuestas de error consistentes
    - Sin datos sensibles en mensajes de error
    - Códigos de estado HTTP apropiados

### Flujo de Trabajo de Desarrollo

11. **Control de Versiones**

    - Git para control de código fuente
    - Mensajes de commit significativos
    - Flujo de trabajo con ramas de características

12. **Configuración de Entorno**

    - Variables de entorno para datos sensibles
    - Configuraciones separadas para dev/prod
    - Archivos .env.example para documentación

13. **Formato de Código**

    - ESLint para linting de código
    - Prettier para formato de código
    - Estilo de código consistente

14. **Gestión de Base de Datos**

    - Migraciones de base de datos para control de versiones
    - TypeORM para consultas con seguridad de tipos
    - Pooling de conexiones

15. **Documentación**
    - Archivos README completos
    - Comentarios de código para lógica compleja
    - Documentación de API con ejemplos
    - Diagramas de arquitectura

---

## 📡 Endpoints de la API

### Autenticación

| Método | Endpoint             | Descripción             | Autenticación Requerida |
| ------ | -------------------- | ----------------------- | ----------------------- |
| POST   | `/api/auth/register` | Registrar nuevo usuario | No                      |
| POST   | `/api/auth/login`    | Iniciar sesión          | No                      |

### Gestión de Usuarios

| Método | Endpoint             | Descripción                       | Autenticación Requerida |
| ------ | -------------------- | --------------------------------- | ----------------------- |
| GET    | `/api/users/profile` | Obtener perfil del usuario actual | Sí                      |
| PUT    | `/api/users/profile` | Actualizar perfil de usuario      | Sí                      |
| GET    | `/api/users`         | Listar todos los usuarios         | Sí                      |

Para documentación detallada de la API con ejemplos de solicitud/respuesta, consulta el [README del Backend](./backend/README.md).

---

## 🔐 Variables de Entorno

### Backend (.env)

```env
# Aplicación
NODE_ENV=development
PORT=3000

# Base de datos
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=aura_auth

# JWT
JWT_SECRET=tu-clave-secreta-jwt-super-segura-cambia-esto-en-produccion
JWT_EXPIRATION=1d
```

### Frontend (.env)

```env
# Configuración de API
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK_API=false
```

⚠️ **Nota de Seguridad**: Siempre usa secretos fuertes y aleatorios en producción y nunca hagas commit de archivos `.env` al control de versiones.

---

## 🧪 Pruebas

### Pruebas del Backend

```bash
cd backend

# Pruebas unitarias
npm run test

# Pruebas E2E
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

### Pruebas del Frontend

```bash
cd frontend

# Ejecutar pruebas (cuando estén implementadas)
yarn test

# Cobertura de pruebas
yarn test:coverage
```

---

## 📦 Scripts Disponibles

### Backend

| Comando                    | Descripción                                   |
| -------------------------- | --------------------------------------------- |
| `npm run start:dev`        | Iniciar servidor de desarrollo con modo watch |
| `npm run build`            | Compilar para producción                      |
| `npm run start`            | Iniciar servidor de producción                |
| `npm run migration:run`    | Ejecutar migraciones de base de datos         |
| `npm run migration:revert` | Revertir última migración                     |
| `npm run lint`             | Ejecutar ESLint                               |
| `npm run format`           | Formatear código con Prettier                 |

### Frontend

| Comando        | Descripción                                  |
| -------------- | -------------------------------------------- |
| `yarn dev`     | Iniciar servidor de desarrollo (puerto 3000) |
| `yarn build`   | Compilar para producción                     |
| `yarn preview` | Vista previa de compilación de producción    |
| `yarn lint`    | Ejecutar ESLint                              |
| `yarn format`  | Formatear código con Prettier                |

---

## 📚 Stack Tecnológico

### Backend

| Tecnología          | Propósito             |
| ------------------- | --------------------- |
| **NestJS**          | Framework Node.js     |
| **TypeScript**      | Seguridad de tipos    |
| **PostgreSQL**      | Base de datos         |
| **TypeORM**         | ORM y migraciones     |
| **Passport**        | Autenticación         |
| **JWT**             | Auth basada en tokens |
| **bcrypt**          | Hash de contraseñas   |
| **class-validator** | Validación de entrada |
| **Docker**          | Containerización      |

### Frontend

| Tecnología       | Propósito                  |
| ---------------- | -------------------------- |
| **React 18**     | Biblioteca UI              |
| **TypeScript**   | Seguridad de tipos         |
| **Vite**         | Herramienta de compilación |
| **TailwindCSS**  | CSS utility-first          |
| **React Router** | Enrutamiento del cliente   |
| **Axios**        | Cliente HTTP               |
| **ESLint**       | Linting de código          |
| **Prettier**     | Formato de código          |

---

## 🤝 Contribuir

¡Damos la bienvenida a contribuciones! Por favor sigue estas pautas:

1. **Sigue la arquitectura existente** - Mantén los principios de Arquitectura Limpia
2. **Escribe mensajes de commit significativos** - Usa el formato de commits convencionales
3. **Agrega pruebas** para nuevas características
4. **Actualiza la documentación** según sea necesario
5. **Sigue el estilo de código** - Ejecuta linter y formateador antes de hacer commit
6. **Mantén los PRs enfocados** - Una característica/corrección por pull request

### Flujo de Trabajo de Desarrollo

1. Haz fork del repositorio
2. Crea una rama de característica (`git checkout -b feature/caracteristica-increible`)
3. Realiza tus cambios siguiendo la arquitectura
4. Ejecuta pruebas y linters
5. Haz commit de tus cambios (`git commit -m 'feat: agregar característica increíble'`)
6. Haz push a la rama (`git push origin feature/caracteristica-increible`)
7. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Diego Rosas** - [GitHub](https://github.com/diego-rosas)

---

## 🆘 Solución de Problemas

### Problemas Comunes

**Puerto ya en uso:**

- Backend: Cambia `PORT` en el `.env` del backend
- Frontend: Cambia el puerto en `vite.config.ts`

**Falló la conexión a la base de datos:**

- Asegúrate de que PostgreSQL esté ejecutándose
- Verifica las credenciales de la base de datos en `.env`
- Verifica `DB_HOST` (usa `localhost` para local, `postgres` para Docker)

**El frontend no puede conectarse al backend:**

- Verifica que el backend esté ejecutándose en el puerto correcto
- Verifica `VITE_API_BASE_URL` en el `.env` del frontend
- Asegúrate de que CORS esté configurado correctamente

**La autenticación no funciona:**

- Verifica que JWT_SECRET esté configurado en el `.env` del backend
- Verifica que el token se esté almacenando en localStorage
- Revisa la consola del navegador en busca de errores

---

## 📞 Soporte

Para preguntas, problemas o solicitudes de características:

- Consulta la documentación en este README y los READMEs específicos de componentes
- Revisa los comentarios del código y ejemplos
- Abre un issue en GitHub
- Contacta a los mantenedores

---

## 🙏 Agradecimientos

Este proyecto demuestra prácticas modernas de ingeniería de software y sirve como implementación de referencia para:

- Arquitectura Limpia en aplicaciones full-stack
- Principios de Diseño Dirigido por el Dominio
- Principios SOLID y patrones de diseño
- Sistemas de autenticación seguros
- Mejores prácticas de TypeScript

Siéntete libre de usar este proyecto como recurso de aprendizaje o punto de partida para tus propias aplicaciones.

---

**Construido con ❤️ por Diego Rosas**
