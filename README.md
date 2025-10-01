# 🤖 OpenAI Chat Interface

Una aplicación moderna de chat con OpenAI que incluye frontend en React/Vite y backend en FastAPI.

## 📁 Estructura del Proyecto

```
ai/00/
├── api/                    # Backend FastAPI
│   ├── app.py             # Aplicación principal
│   ├── requirements.txt   # Dependencias Python para Vercel
│   └── vercel.json        # Configuración Vercel del API
├── frontend/              # Frontend React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── pyproject.toml         # Dependencias Python (desarrollo local)
├── vercel.json           # Configuración Vercel principal
└── deploy-vercel.sh      # Script de despliegue
```

## 🚀 Inicio Rápido

### Desarrollo Local

#### Backend
```bash
# Instalar dependencias con uv
uv sync

# Iniciar servidor
uv run python api/app.py

# O con auto-reload
uv run uvicorn api.app:app --reload
```

El backend estará disponible en `http://localhost:8000`

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

### Configuración

1. Abre `http://localhost:3000`
2. Ingresa tu OpenAI API Key
3. Configura la URL del API: `http://localhost:8000/api/chat`
4. Haz clic en "Probar" para verificar la conexión
5. ¡Comienza a chatear!

## 🌐 Despliegue en Vercel

### Opción 1: CLI (Recomendado)

```bash
# Instalar Vercel CLI si no lo tienes
npm install -g vercel

# Desde la raíz del proyecto
./deploy-vercel.sh

# O manualmente
vercel          # Para preview
vercel --prod   # Para producción
```

### Opción 2: GitHub

1. Sube el código a GitHub
2. Ve a [vercel.com/new](https://vercel.com/new)
3. Importa tu repositorio
4. Vercel detectará automáticamente la configuración
5. ¡Despliega!

### Configuración Post-Despliegue

Después del despliegue, tu app estará en: `https://tu-proyecto.vercel.app`

**Actualiza la configuración en el frontend:**
- API URL: `https://tu-proyecto.vercel.app/api/chat`
- Haz clic en "Probar" para verificar la conexión

## 📚 Documentación

- [Backend API](/api/README.md) - Documentación del API FastAPI
- [Frontend](/frontend/README.md) - Documentación del frontend
- [Despliegue Vercel](/VERCEL_DEPLOYMENT.md) - Guía detallada de despliegue

## 🔧 Características

### Backend (FastAPI)
- ✅ API REST con streaming
- ✅ CORS configurado
- ✅ Health check endpoint
- ✅ Soporte para múltiples modelos GPT
- ✅ Documentación automática (Swagger)

### Frontend (React + Vite)
- ✅ Interfaz moderna y responsive
- ✅ Streaming de respuestas en tiempo real
- ✅ Validación de conexión con backend
- ✅ Indicador de estado de API
- ✅ Panel de configuración
- ✅ Tailwind CSS

## 📡 Endpoints del API

### Chat
```
POST /api/chat
Content-Type: application/json

{
  "developer_message": "You are a helpful assistant.",
  "user_message": "Hello!",
  "model": "gpt-4o-mini",
  "api_key": "sk-..."
}
```

### Health Check
```
GET /api/health

Response: {"status": "ok"}
```

## 🔒 Seguridad

**⚠️ Importante:** Por defecto, la API key se envía desde el frontend. Para mayor seguridad en producción:

1. Configura `OPENAI_API_KEY` como variable de entorno en Vercel
2. Modifica `api/app.py` para usar la variable de entorno
3. Elimina el campo `api_key` del modelo de request

Ver [VERCEL_DEPLOYMENT.md](/VERCEL_DEPLOYMENT.md#-seguridad) para detalles.

## ⚠️ Limitaciones en Vercel

- **Timeout**: 10 segundos (Hobby) / 60 segundos (Pro)
- **Streaming**: Funciona pero con limitaciones de tiempo
- **Cold Starts**: Primera request puede ser lenta

## 🐛 Troubleshooting

### Error: "Failed to fetch"
- ✅ Verifica que el backend esté corriendo
- ✅ Revisa que la URL del API sea correcta
- ✅ Verifica CORS si usas un dominio diferente

### Error: "API Desconectada"
- ✅ El indicador rojo significa que el backend no responde
- ✅ Haz clic en "Probar" para verificar la conexión
- ✅ Revisa los logs del servidor

### Error en Vercel
- ✅ Revisa los logs en Vercel Dashboard
- ✅ Verifica que `requirements.txt` esté actualizado
- ✅ Confirma que las rutas en `vercel.json` sean correctas

## 🛠️ Tecnologías

- **Backend**: FastAPI, Python 3.11, OpenAI SDK, Uvicorn
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Deployment**: Vercel
- **Package Managers**: uv (Python), npm (JavaScript)

## 📝 Scripts Disponibles

### Backend
```bash
uv run python api/app.py       # Iniciar servidor
uv run uvicorn api.app:app --reload  # Con auto-reload
```

### Frontend
```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build para producción
npm run preview    # Preview del build
npm run lint       # Linter
```

### Despliegue
```bash
./deploy-vercel.sh      # Despliegue interactivo
vercel                  # Preview deployment
vercel --prod          # Production deployment
vercel logs            # Ver logs
```

## 📄 Licencia

Este proyecto es de código abierto.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios propuestos.

---

**¿Necesitas ayuda?** Revisa la documentación en las carpetas `/api` y `/frontend` o abre un issue.
