# 🚀 Quick Start Guide

## ⚠️ Requisitos de Node.js

Este proyecto requiere **Node.js 18 o superior**. 

### Cambiar a Node 18 (si usas nvm)

```bash
# El proyecto incluye un archivo .nvmrc, así que simplemente ejecuta:
nvm use

# O manualmente:
nvm use 18
```

Si no tienes Node 18 instalado:
```bash
nvm install 18
nvm use 18
```

## 📦 Instalación Rápida

```bash
# 1. Navegar al directorio
cd chat-frontend

# 2. Asegurar que usas Node 18+
nvm use

# 3. Instalar dependencias
npm install
```

## 🏃 Ejecutar el Proyecto

### 1. Iniciar el Backend (en una terminal)

```bash
cd ../api
uv run python app.py
```

El backend estará en: `http://localhost:8000`

### 2. Iniciar el Frontend (en otra terminal)

```bash
cd chat-frontend
nvm use  # Asegura que usas Node 18
npm run dev
```

El frontend estará en: `http://localhost:3000`

## ✅ Verificación Rápida

- ✓ Backend corriendo en http://localhost:8000
- ✓ Frontend corriendo en http://localhost:3000
- ✓ Node.js versión 18+ (`node --version`)

## 🔑 Configuración

1. Abre http://localhost:3000
2. Ingresa tu OpenAI API Key
3. Configura el modelo y mensaje del sistema
4. ¡Comienza a chatear!

## 🐛 Troubleshooting

### Error: "Unexpected reserved word"
➜ Estás usando Node.js < 14. Ejecuta `nvm use 18`

### Backend no responde
➜ Verifica que el backend esté corriendo en puerto 8000

### Puerto 3000 en uso
➜ Cambia el puerto en `vite.config.ts`:
```typescript
server: {
  port: 3001, // Cambia aquí
}
```

## 🚀 Despliegue en Vercel

### Opción 1: Usar el script helper
```bash
./vercel-deploy.sh          # Preview deployment
./vercel-deploy.sh --prod   # Production deployment
```

### Opción 2: Comando manual
```bash
nvm use 18
vercel --prod
```

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para guía completa de despliegue.

## 📚 Más Información

- [README.md](./README.md) - Documentación completa
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía de despliegue
