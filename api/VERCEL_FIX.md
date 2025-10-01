# 🔧 Solución para Conexión Vercel

## Problema Identificado

Tu API está desplegada en: `https://api-ybsfnv8a1-antoniof08s-projects.vercel.app`

Pero no puede conectarse porque FastAPI en Vercel necesita configuración especial.

## ✅ Cambios Realizados

1. **app.py** - Agregados endpoints flexibles:
   - `/health` y `/api/health`
   - `/chat` y `/api/chat`
   - `/` - endpoint raíz para verificar

2. **index.py** - Archivo nuevo para Vercel serverless

3. **vercel.json** - Rutas actualizadas

## 🚀 Pasos para Solucionar

### 1. Re-desplegar el API

Desde el directorio `/api`:

```bash
cd /Users/antonio/Work/ai/00/api
vercel --prod
```

### 2. Probar las URLs

Abre en tu navegador (reemplaza con tu URL de Vercel):

**Root:**
```
https://api-ybsfnv8a1-antoniof08s-projects.vercel.app/
```
Deberías ver:
```json
{
  "message": "OpenAI Chat API",
  "status": "running",
  "endpoints": {
    "health": ["/health", "/api/health"],
    "chat": ["/chat", "/api/chat"]
  }
}
```

**Health Check:**
```
https://api-ybsfnv8a1-antoniof08s-projects.vercel.app/health
```
Deberías ver:
```json
{"status": "ok"}
```

### 3. Configurar el Frontend

Prueba estas URLs en el panel de configuración del frontend (haz clic en "Probar" después de cada una):

**Opción 1:**
```
https://api-ybsfnv8a1-antoniof08s-projects.vercel.app/chat
```

**Opción 2:**
```
https://api-ybsfnv8a1-antoniof08s-projects.vercel.app/api/chat
```

Usa la que funcione (probablemente la Opción 1).

## 🐛 Si Aún No Funciona

### Verificación 1: Logs de Vercel

```bash
cd /Users/antonio/Work/ai/00/api
vercel logs
```

Busca errores como:
- Import errors
- Missing dependencies
- Timeout errors

### Verificación 2: Probar con curl

```bash
# Health check
curl https://api-ybsfnv8a1-antoniof08s-projects.vercel.app/health

# Chat (reemplaza YOUR_OPENAI_KEY)
curl -X POST https://api-ybsfnv8a1-antoniof08s-projects.vercel.app/chat \
  -H "Content-Type: application/json" \
  -d '{
    "developer_message": "You are helpful.",
    "user_message": "Say hi",
    "model": "gpt-4o-mini",
    "api_key": "YOUR_OPENAI_KEY"
  }'
```

### Verificación 3: CORS

Si ves errores de CORS en la consola del navegador:

1. Ve al Dashboard de Vercel
2. Settings → Environment Variables
3. Agrega: `CORS_ORIGINS=*`
4. Re-despliega

### Verificación 4: Python Runtime

Si hay errores de versión de Python:

Crea archivo `.python-version` en `/api`:
```bash
echo "3.11" > /Users/antonio/Work/ai/00/api/.python-version
vercel --prod
```

## 📱 Alternativa: Desplegar Todo Junto

Si prefieres desplegar frontend + backend juntos:

```bash
# Desde la raíz del proyecto
cd /Users/antonio/Work/ai/00
vercel --prod
```

Luego usa:
```
https://tu-proyecto.vercel.app/api/chat
```

## ⚡ Solución Rápida

**Si tienes prisa**, usa esta URL en el frontend:

```
https://api-ybsfnv8a1-antoniof08s-projects.vercel.app/chat
```

Y actualiza la función de validación en `ConfigPanel.tsx` para que use `/health` en lugar de `/api/health`.

## 🎯 Comandos Rápidos

```bash
# Re-desplegar
cd /Users/antonio/Work/ai/00/api && vercel --prod

# Ver logs
vercel logs --follow

# Ver todas las URLs
vercel ls

# Información del proyecto
vercel inspect
```

## 📞 Necesitas Más Ayuda?

1. Comparte los logs: `vercel logs > logs.txt`
2. Verifica el browser console (F12 → Console)
3. Prueba el endpoint raíz primero: `https://tu-url/`

La API ahora tiene endpoints duplicados para funcionar tanto desplegada sola como parte del monorepo. 🚀

