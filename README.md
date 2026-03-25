# CRUD de Usuarios - API REST

API REST simple y minimalista para gestionar usuarios con PostgreSQL, lista para desplegar en Render.

## Características

- CRUD completo para usuarios (Crear, Leer, Actualizar, Eliminar)
- Base de datos PostgreSQL
- API REST con Express.js
- Validación de datos
- Respuestas JSON estandarizadas

## Estructura de la Base de Datos

**Tabla: usuarios**
- `id` (SERIAL PRIMARY KEY)
- `nombre` (VARCHAR 100, NOT NULL)
- `email` (VARCHAR 100, NOT NULL, UNIQUE)
- `edad` (INTEGER)
- `created_at` (TIMESTAMP)

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Obtener todos los usuarios |
| GET | `/api/usuarios/:id` | Obtener un usuario por ID |
| POST | `/api/usuarios` | Crear un nuevo usuario |
| PUT | `/api/usuarios/:id` | Actualizar un usuario |
| DELETE | `/api/usuarios/:id` | Eliminar un usuario |

## Ejemplos de Uso

### Obtener todos los usuarios
```bash
GET /api/usuarios
```

### Crear un usuario
```bash
POST /api/usuarios
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "edad": 25
}
```

### Actualizar un usuario
```bash
PUT /api/usuarios/1
Content-Type: application/json

{
  "nombre": "Juan Pérez Actualizado",
  "edad": 26
}
```

### Eliminar un usuario
```bash
DELETE /api/usuarios/1
```

## Instalación Local

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno en `.env`:
```env
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/usuarios_db
NODE_ENV=development
```

4. Inicializar la base de datos:
```bash
npm run init-db
```

5. Iniciar el servidor:
```bash
npm start
```

## Despliegue en Render

### Opción 1: Usando render.yaml (Recomendado)

1. Sube el código a GitHub
2. Ve a [Render Dashboard](https://dashboard.render.com/)
3. Click en "New" → "Blueprint"
4. Conecta tu repositorio de GitHub
5. Render detectará automáticamente el archivo `render.yaml` y creará:
   - Una base de datos PostgreSQL
   - Un servicio web con la API

### Opción 2: Configuración Manual

#### Paso 1: Crear la Base de Datos PostgreSQL

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en "New" → "PostgreSQL"
3. Configura:
   - **Name**: `usuarios-db`
   - **Database**: `usuarios_db`
   - **User**: `usuarios_user`
   - **Region**: Selecciona la más cercana
   - **Plan**: Free
4. Click en "Create Database"
5. Guarda la **Internal Database URL** que aparece

#### Paso 2: Crear el Web Service

1. Click en "New" → "Web Service"
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Name**: `usuarios-crud-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && node init-db.js`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. Agrega las variables de entorno:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = [Pega aquí la Internal Database URL de tu base de datos]

5. Click en "Create Web Service"

#### Paso 3: Verificar el Despliegue

1. Espera a que el build termine (2-3 minutos)
2. Accede a la URL que Render te proporciona (ej: `https://usuarios-crud-api.onrender.com`)
3. Deberías ver el mensaje de bienvenida de la API

## Probar la API Desplegada

Una vez desplegada, puedes probar con:

```bash
# Obtener todos los usuarios
curl https://tu-app.onrender.com/api/usuarios

# Crear un usuario
curl -X POST https://tu-app.onrender.com/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test User","email":"test@example.com","edad":25}'
```

## Notas Importantes

- El plan gratuito de Render pone en "sleep" el servicio después de 15 minutos de inactividad
- La primera petición después del "sleep" puede tardar 30-60 segundos
- La base de datos gratuita tiene un límite de 90 días de retención

## Tecnologías Utilizadas

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- dotenv
- cors

## Estructura del Proyecto

```
.
├── server.js              # Servidor Express principal
├── db.js                  # Configuración de PostgreSQL
├── usuariosController.js  # Controladores CRUD
├── usuariosRoutes.js      # Rutas de la API
├── init-db.js            # Script de inicialización de DB
├── package.json          # Dependencias
├── .env                  # Variables de entorno (local)
├── render.yaml           # Configuración de Render
└── README.md             # Documentación
```

## Licencia

MIT
