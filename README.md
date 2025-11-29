# WFL Backend

![WFL Logo](../wfl/public/logos/LOGO_WFL.png)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0.0-red)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0.0-2D3748)](https://www.prisma.io/)

## Descripción

API REST backend para el sistema de gestión de la Waifu Football League (WFL), construida con NestJS. Proporciona endpoints para gestionar series, equipos, jugadores y autenticación de usuarios.

## ✨ Características

- 🔐 **Autenticación JWT** - Sistema seguro con tokens JWT
- ⚽ **Gestión de series** - API completa para torneos y competiciones
- 👥 **Equipos y jugadores** - Endpoints para manejo de equipos y miembros
- 📚 **Documentación Swagger** - API documentada automáticamente
- 🗄️ **Base de datos Prisma** - ORM moderno con migraciones
- 📁 **Subida de archivos** - Soporte para archivos con Multer
- 🔒 **Encriptación** - Contraseñas seguras con bcrypt

## Tecnologías Utilizadas

- **NestJS** - Framework de Node.js para aplicaciones backend
- **TypeScript** - JavaScript con tipado estático
- **Prisma** - ORM para base de datos
- **JWT** - Autenticación basada en tokens
- **Swagger** - Documentación de API
- **Multer** - Manejo de archivos
- **bcrypt** - Encriptación de contraseñas

## Requisitos Previos

- Node.js 18+
- pnpm (recomendado) o npm/yarn
- Base de datos PostgreSQL o compatible con Prisma

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd wfl_backend
```

2. Instala las dependencias:
```bash
pnpm install
```

3. Configura la base de datos en `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/wfl_db"
JWT_SECRET="tu-jwt-secret"
```

4. Ejecuta las migraciones de Prisma:
```bash
npx prisma migrate dev
```

## Ejecución en Desarrollo

```bash
pnpm start:dev
```

El servidor estará disponible en [http://localhost:4000](http://localhost:4000).

## Construcción para Producción

```bash
pnpm build
pnpm start:prod
```

## Documentación de API

La documentación Swagger está disponible en `/api/docs` cuando el servidor está ejecutándose. Incluye autenticación JWT, ejemplos de requests y responses, y documentación completa de todos los endpoints.

## Scripts Disponibles

- `pnpm start:dev` - Inicia el servidor en modo desarrollo con watch
- `pnpm start:prod` - Inicia el servidor en modo producción
- `pnpm build` - Construye la aplicación
- `pnpm test` - Ejecuta los tests
- `pnpm lint` - Ejecuta el linter
- `npx prisma studio` - Abre Prisma Studio para gestión de BD

## Estructura del Proyecto

```
src/
├── auth/           # Módulo de autenticación
├── series/         # Módulo de series
├── equipos/        # Módulo de equipos
├── jugadores/      # Módulo de jugadores
├── app.module.ts   # Módulo principal
└── main.ts         # Punto de entrada

prisma/
└── schema.prisma   # Esquema de base de datos
```

## Base de Datos

El proyecto utiliza Prisma como ORM. El esquema se encuentra en `prisma/schema.prisma`.

Para generar el cliente de Prisma después de cambios en el esquema:
```bash
npx prisma generate
```

## Variables de Entorno

### Configuración para Desarrollo Local (SQLite)
```env
DATABASE_URL="file:./prisma/dev.db"
PORT=4000
JWT_SECRET="tu-clave-secreta-jwt-desarrollo-aqui"
BASE_URL="http://localhost:4000"
NODE_ENV=development
```

### Configuración para Producción (PostgreSQL)
```env
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/base_de_datos"
JWT_SECRET="tu-clave-secreta-jwt-produccion-muy-segura-aqui"
BASE_URL="https://tu-dominio.com"
NODE_ENV=production
```

**Variables disponibles:**
- `DATABASE_URL`: URL de conexión a la base de datos (SQLite para desarrollo, PostgreSQL para producción)
- `JWT_SECRET`: Clave secreta para JWT (debe ser diferente en desarrollo y producción)
- `PORT`: Puerto del servidor (por defecto 4000)
- `BASE_URL`: URL base de la aplicación
- `NODE_ENV`: Entorno de ejecución (development/production)

## Despliegue

Consulta el archivo `DEPLOYMENT.md` en el directorio raíz para instrucciones de despliegue.

## Error Codes Documentation

### ERR_001: Internal Server Error
- **Description**: Error interno del servidor al crear el jugador
- **Details**: Ocurrió un error inesperado durante la creación del jugador
- **HTTP Status**: 500 Internal Server Error

### ERR_002: Validation Error
- **Description**: Error de validación en los datos enviados
- **Details**: Los datos proporcionados no cumplen con los requisitos de validación
- **HTTP Status**: 400 Bad Request

### ERR_003: Database Connection Error
- **Description**: Error de conexión a la base de datos
- **Details**: No se pudo establecer conexión con la base de datos
- **HTTP Status**: 500 Internal Server Error

### ERR_004: File Upload Error
- **Description**: Error al subir archivo
- **Details**: Ocurrió un error durante la subida del archivo
- **HTTP Status**: 500 Internal Server Error

### ERR_005: Authentication Error
- **Description**: Error de autenticación
- **Details**: Token inválido o expirado
- **HTTP Status**: 401 Unauthorized

### ERR_006: Authorization Error
- **Description**: Error de autorización
- **Details**: No tienes permisos para realizar esta acción
- **HTTP Status**: 403 Forbidden

### ERR_007: Not Found Error
- **Description**: Recurso no encontrado
- **Details**: El recurso solicitado no existe
- **HTTP Status**: 404 Not Found

### ERR_008: Conflict Error
- **Description**: Conflicto de datos
- **Details**: Ya existe un registro con esos datos
- **HTTP Status**: 409 Conflict

### ERR_009: Bad Request
- **Description**: Solicitud incorrecta
- **Details**: Los parámetros de la solicitud son inválidos
- **HTTP Status**: 400 Bad Request

### ERR_010: Service Unavailable
- **Description**: Servicio no disponible
- **Details**: El servicio no está disponible temporalmente
- **HTTP Status**: 503 Service Unavailable

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. 🍴 **Fork** el proyecto
2. 🌿 Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Realiza tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push a la rama (`git push origin feature/AmazingFeature`)
5. 🔄 Abre un Pull Request

### Guías de contribución

- Sigue las convenciones de código existentes
- Agrega tests para nuevas funcionalidades
- Actualiza la documentación según sea necesario
- Asegúrate de que todos los tests pasan

## 📄 Licencia

Este proyecto es privado y no tiene licencia pública.

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, abre un [issue](https://github.com/lans757/wfl/issues) en GitHub.

## 📋 Changelog - Actualizaciones Recientes

### v1.1.0 - Correcciones y Mejoras (2025-11-29)

#### 🐛 Correcciones Críticas
- **Campo de imagen unificado**: Cambiado consistentemente de `image` a `imagen` en todo el backend (schema Prisma, servicios, controladores)
- **Formularios frontend corregidos**: Los formularios de creación/edición de equipos ahora usan nombres de campos en inglés correctos
- **Validación de DTO mejorada**: Agregado decorador `@Transform` para conversión automática de `seriesId` de string a number
- **Manejo de errores de API**: Reemplazado `Promise.all` con llamadas individuales para evitar que un endpoint fallido bloquee toda la interfaz

#### 🎨 Mejoras en la Interfaz de Usuario
- **Imágenes reales en vistas**: Las tarjetas de series y equipos ahora muestran las imágenes subidas reales en lugar de íconos estáticos
- **Manejo de errores de imágenes**: Implementado fallback automático a íconos SVG cuando las imágenes fallan al cargar
- **URLs de imágenes corregidas**: Hardcodeado `localhost:4000` para asegurar construcción correcta de URLs de imágenes
- **Interfaces TypeScript actualizadas**: Agregado campo `imagen` a la interfaz `Equipo` en el frontend

#### 🔧 Mejoras Técnicas
- **Campos de imagen consistentes**: Unificado el uso de `imagen` en lugar de `image` en toda la aplicación
- **File upload mejorado**: Corregidos los interceptores de archivos para usar `imagen` consistentemente
- **Cliente Prisma regenerado**: Actualizado después de cambios en el schema
- **Validación de formularios**: Mejorada la validación en formularios de creación de equipos

#### 📱 Experiencia de Usuario
- **Vista de series mejorada**: Las tarjetas de series muestran imágenes reales con fallback elegante
- **Vista de equipos mejorada**: Los equipos en las vistas de series muestran sus imágenes subidas
- **Carga más robusta**: La interfaz no se bloquea si algunos endpoints fallan
- **Mensajes de error mejorados**: Mejor manejo de errores con logging detallado

#### 🗄️ Base de Datos
- **Schema Prisma actualizado**: Campo `image` → `imagen` en modelos Team, Serie, Player y User
- **Migraciones aplicadas**: Base de datos actualizada para reflejar cambios en el schema
- **Consistencia de datos**: Asegurada uniformidad en el manejo de campos de imagen

#### 🔒 Seguridad y Rendimiento
- **Manejo de archivos mejorado**: File upload más robusto con nombres de campos consistentes
- **Validación de entrada**: Mejorada la validación de datos en DTOs
- **Gestión de errores**: Mejor logging y manejo de errores en toda la aplicación

### Problemas Resueltos
- ✅ Error "Unexpected field - imagen" al crear series
- ✅ Formularios de equipos enviando campos en español al backend
- ✅ Imágenes no se mostraban en vistas de usuario
- ✅ `Promise.all` bloqueando la interfaz cuando un endpoint fallaba
- ✅ Inconsistencias entre campos `image`/`imagen` en el backend
- ✅ Validación incorrecta de `seriesId` en DTOs
- ✅ URLs de imágenes mal construidas en el frontend

### Compatibilidad
- **Backend**: NestJS 10.0.0, Prisma 5.0.0, TypeScript 5.0.0
- **Frontend**: Next.js con TypeScript, Axios para requests HTTP
- **Base de datos**: PostgreSQL/SQLite compatible con Prisma
- **Navegadores**: Soporte completo con fallback para imágenes
