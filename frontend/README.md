# OpenAI Chat Frontend

Una aplicación frontend moderna construida con React, TypeScript y Tailwind CSS que se conecta a la API de chat de OpenAI a través del backend FastAPI.

## ✨ Características

- 💬 **Interfaz de Chat en Tiempo Real** - Streaming de respuestas de OpenAI
- ⚙️ **Configuración Flexible** - Personaliza API key, modelo y mensajes del sistema
- 🎨 **UI Moderna** - Diseño limpio y responsivo con Tailwind CSS
- ⚡ **Vite** - Desarrollo rápido con Hot Module Replacement
- 🔷 **TypeScript** - Type safety completo
- 🔒 **Seguro** - API key almacenada solo en el navegador

## 🛠️ Stack Tecnológico

- **Framework**: React 18
- **Lenguaje**: TypeScript
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **API**: Integración con FastAPI backend

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Backend FastAPI corriendo (ver directorio `/api`)

## 🚀 Instalación

1. Navega al directorio del frontend:
   ```bash
   cd chat-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## 💻 Desarrollo

1. Asegúrate de que el backend FastAPI esté corriendo:
   ```bash
   # En el directorio raíz del proyecto
   cd api
   uv run python app.py
   ```

2. Inicia el servidor de desarrollo del frontend:
   ```bash
   npm run dev
   ```

3. Abre tu navegador en `http://localhost:3000`

## 📝 Configuración Inicial

Al abrir la aplicación por primera vez, verás un panel de configuración donde debes:

1. **API Key de OpenAI**: Ingresa tu clave API de OpenAI (empieza con `sk-...`)
2. **API URL**: URL del backend (default: `http://localhost:8000/api/chat`)
3. **Modelo**: Selecciona el modelo de OpenAI a usar:
   - GPT-4o Mini (recomendado para desarrollo)
   - GPT-4o
   - GPT-4 Turbo
   - GPT-3.5 Turbo
4. **Mensaje del Sistema**: Define el comportamiento del asistente

## 🏗️ Build para Producción

Crear una build de producción:

```bash
npm run build
```

Los archivos compilados estarán en el directorio `dist/`.

### Vista Previa de Producción

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
chat-frontend/
├── src/
│   ├── components/
│   │   ├── ChatInterface.tsx    # Interfaz principal de chat
│   │   └── ConfigPanel.tsx      # Panel de configuración
│   ├── App.tsx                  # Componente principal
│   ├── main.tsx                 # Punto de entrada
│   └── index.css                # Estilos globales
├── public/                      # Archivos estáticos
├── index.html                   # Template HTML
├── package.json                 # Dependencias
├── tsconfig.json               # Configuración TypeScript
├── tailwind.config.cjs         # Configuración Tailwind
└── vite.config.ts              # Configuración Vite
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Vista previa de build
- `npm run lint` - Ejecuta ESLint

## 🔌 API Integration

La aplicación se conecta al backend FastAPI con el siguiente flujo:

1. El usuario configura sus credenciales y preferencias
2. Al enviar un mensaje, se hace un POST request a `/api/chat`
3. La respuesta se recibe en streaming
4. Los mensajes se muestran en tiempo real

### Formato de Request

```json
{
  "developer_message": "You are a helpful AI assistant.",
  "user_message": "Hello, how are you?",
  "model": "gpt-4o-mini",
  "api_key": "sk-..."
}
```

## 🎨 Personalización

### Cambiar Colores

Edita `tailwind.config.cjs` para personalizar el tema:

```javascript
colors: {
  primary: {
    // Tus colores personalizados
  }
}
```

### Agregar Nuevos Componentes

1. Crea el componente en `src/components/`
2. Importa y usa en `App.tsx` o donde lo necesites

## 🔒 Seguridad

- Las API keys se almacenan solo en el estado local de React (memoria del navegador)
- No se persisten en localStorage ni se envían a ningún servidor excepto al backend configurado
- El backend FastAPI maneja la comunicación segura con OpenAI

## 🐛 Troubleshooting

### El backend no responde

- Verifica que el backend esté corriendo en `http://localhost:8000`
- Revisa los logs del backend para errores
- Confirma que CORS esté habilitado en el backend

### Errores de API Key

- Verifica que tu API key sea válida
- Asegúrate de tener créditos en tu cuenta de OpenAI
- Revisa que el modelo seleccionado esté disponible para tu cuenta

### Problemas de CORS

Si encuentras errores de CORS, verifica la configuración en `api/app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Ajusta según necesites
    ...
)
```

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [OpenAI API](https://platform.openai.com/docs)

## 🤝 Contribuir

1. Haz tus cambios
2. Ejecuta `npm run lint` para verificar calidad del código
3. Prueba con `npm run dev`
4. Build para asegurar que todo funciona: `npm run build`

## 📄 Licencia

Este proyecto es parte del AI Engineer Challenge.

---

Desarrollado con ❤️ usando React + TypeScript + Tailwind CSS
