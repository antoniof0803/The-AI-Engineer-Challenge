# 🚀 Guía de Despliegue

## Despliegue en Vercel

### Prerrequisitos

- Cuenta en [Vercel](https://vercel.com)
- Node.js 18+ instalado (`nvm use 18`)
- Vercel CLI instalado globalmente

### Instalación de Vercel CLI (si no lo tienes)

```bash
# Asegúrate de usar Node 18+
nvm use 18

# Instala Vercel CLI globalmente
npm install -g vercel@latest

# Verifica la instalación
vercel --version
```

### 🔧 Configuración para Vercel

Este proyecto ya incluye la configuración necesaria para Vercel. Vite se encarga de todo automáticamente.

### 📦 Despliegue del Frontend

#### Opción 1: Despliegue desde la línea de comandos

```bash
# 1. Asegúrate de estar en el directorio correcto
cd chat-frontend

# 2. Asegúrate de usar Node 18
nvm use 18

# 3. Login en Vercel (solo la primera vez)
vercel login

# 4. Despliega en preview (para pruebas)
vercel

# 5. Despliega en producción
vercel --prod
```

#### Opción 2: Despliegue desde GitHub (Recomendado)

1. **Sube tu código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: OpenAI Chat Frontend"
   git branch -M main
   git remote add origin <tu-repo-url>
   git push -u origin main
   ```

2. **Conecta Vercel con GitHub**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importa tu repositorio
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Configuración del proyecto en Vercel**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Variables de Entorno (Opcional)**
   
   Si quieres configurar valores por defecto:
   - `VITE_API_URL`: URL de tu backend en producción
   - `VITE_DEFAULT_MODEL`: Modelo por defecto (ej: `gpt-4o-mini`)

### 🌐 Despliegue del Backend (API)

El backend FastAPI también puede desplegarse en Vercel:

```bash
# 1. Navega al directorio de la API
cd ../api

# 2. Despliega
vercel --prod
```

**Nota**: El archivo `vercel.json` ya está configurado en el directorio `api/`.

### 🔗 Conectar Frontend y Backend

Una vez que ambos estén desplegados:

1. **Obtén la URL del backend** (ej: `https://your-api.vercel.app`)

2. **Actualiza la configuración del frontend**:
   - Opción A: Los usuarios ingresan la URL del backend en el panel de configuración
   - Opción B: Establece `VITE_API_URL` como variable de entorno en Vercel

### 📝 Archivo vercel.json para el Frontend (Opcional)

Si necesitas configuraciones adicionales, crea este archivo:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 🔐 Consideraciones de Seguridad

⚠️ **IMPORTANTE**: El frontend solicita la API key de OpenAI al usuario. Esta se almacena solo en memoria (React state) y no se persiste. 

Para una aplicación en producción, considera:
- Mover la API key al backend
- Implementar autenticación de usuarios
- Usar variables de entorno del servidor

### 🌍 URLs de Ejemplo

Después del despliegue tendrás:
- **Frontend**: `https://tu-proyecto.vercel.app`
- **Backend**: `https://tu-api.vercel.app`

### 🔄 Actualizaciones Automáticas

Si usas GitHub + Vercel:
- Cada push a `main` → Despliegue en producción
- Cada push a otras ramas → Preview deployment

### 🐛 Troubleshooting

#### Error: "vercel: command not found"
```bash
# Reinstala Vercel CLI con Node 18
nvm use 18
npm install -g vercel@latest
```

#### Error: "Unexpected token '?'"
```bash
# Estás usando Node < 14, cambia a Node 18
nvm use 18
vercel --version
```

#### El build falla en Vercel
- Verifica que Node version sea 18+ en Vercel (Settings → General → Node.js Version)
- Revisa los logs de build en el dashboard de Vercel

#### Frontend no se conecta al backend
- Verifica que la URL del backend sea correcta (debe incluir `/api/chat`)
- Revisa la configuración de CORS en `api/app.py`
- Asegúrate de usar HTTPS en producción

### 📚 Recursos

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [FastAPI on Vercel](https://vercel.com/guides/python-fastapi)

### 💡 Tips

1. **Dominio Personalizado**: Puedes agregar un dominio personalizado en Vercel → Settings → Domains

2. **Variables de Entorno**: Maneja diferentes configuraciones para preview/producción usando variables de entorno

3. **Analytics**: Habilita Vercel Analytics para monitorear el rendimiento

4. **Logs**: Revisa los logs en tiempo real desde el dashboard de Vercel
