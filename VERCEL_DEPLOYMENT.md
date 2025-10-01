# Despliegue en Vercel

## 📋 Requisitos Previos

1. Cuenta en [Vercel](https://vercel.com)
2. Vercel CLI instalado: `npm install -g vercel`
3. Tu OpenAI API Key

## 🚀 Despliegue

### Opción 1: Despliegue desde el CLI

```bash
# Desde la raíz del proyecto /Users/antonio/Work/ai/00
vercel
```

Sigue las instrucciones en pantalla para vincular tu proyecto.

### Opción 2: Despliegue desde GitHub

1. Sube tu código a un repositorio de GitHub
2. Ve a [vercel.com/new](https://vercel.com/new)
3. Importa tu repositorio
4. Vercel detectará automáticamente la configuración

## ⚙️ Variables de Entorno

**IMPORTANTE**: No necesitas configurar `OPENAI_API_KEY` en Vercel porque la API key se envía desde el frontend en cada request.

Si prefieres usar una API key del servidor (más seguro):

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega: `OPENAI_API_KEY` con tu clave

Luego modifica `api/app.py` para usar la variable de entorno en lugar de la que viene del request.

## 🏗️ Arquitectura del Despliegue

```
/                    → Frontend (Vite build estático)
/api/*               → Backend (FastAPI serverless)
```

### Frontend
- Se sirve como sitio estático desde `frontend/dist/`
- Build automático durante el despliegue
- Todos los assets optimizados

### Backend
- Funciona como serverless functions
- Endpoint: `https://tu-proyecto.vercel.app/api/chat`
- Health check: `https://tu-proyecto.vercel.app/api/health`

## ⚠️ Limitaciones en Vercel

### 1. Timeout de Funciones
- **Hobby plan**: 10 segundos máximo
- **Pro plan**: 60 segundos máximo
- Las respuestas largas pueden cortarse

### 2. Streaming
- El streaming funciona pero con limitaciones
- Respuestas muy largas pueden no funcionar correctamente en el plan gratuito

### 3. Cold Starts
- La primera request después de inactividad puede ser lenta
- El servidor se "duerme" después de un tiempo sin uso

## 🔧 Configuración Post-Despliegue

Después del despliegue, actualiza la URL del API en el frontend:

1. Ve a tu app desplegada
2. En el panel de configuración, ingresa:
   - **API URL**: `https://tu-proyecto.vercel.app/api/chat`
3. Haz clic en "Probar" para verificar la conexión

## 🐛 Troubleshooting

### Error: "No se puede conectar con el backend"
- Verifica que el despliegue haya terminado correctamente
- Revisa los logs en Vercel Dashboard
- Asegúrate de usar la URL correcta (debe incluir `/api/chat`)

### Error: "Function timeout"
- Reduce el tamaño de las respuestas
- Considera usar modelos más rápidos (gpt-4o-mini)
- Upgrade a Vercel Pro para timeouts más largos

### Error durante el build
- Verifica que `requirements.txt` tenga todas las dependencias
- Revisa los logs de build en Vercel Dashboard

## 📊 Monitoreo

Vercel provee:
- Analytics de tráfico
- Logs en tiempo real
- Métricas de rendimiento

Accede a estos desde el Dashboard de Vercel.

## 🔒 Seguridad

### Recomendación: Mover API Keys al servidor

Para mayor seguridad, modifica `api/app.py`:

```python
import os

# En lugar de recibir api_key del request:
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
```

Y elimina `api_key` del modelo `ChatRequest`.

Luego configura `OPENAI_API_KEY` en las variables de entorno de Vercel.

## 📝 Comandos Útiles

```bash
# Despliegue en producción
vercel --prod

# Despliegue de preview
vercel

# Ver logs en tiempo real
vercel logs

# Ver lista de despliegues
vercel ls

# Eliminar proyecto
vercel remove
```

## 🌐 URLs de Ejemplo

Después del despliegue:
- **App**: `https://beyond-chatgpt.vercel.app`
- **API Health**: `https://beyond-chatgpt.vercel.app/api/health`
- **API Chat**: `https://beyond-chatgpt.vercel.app/api/chat`

¡Tu app está lista para usarse en producción! 🎉

