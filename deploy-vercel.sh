#!/bin/bash
# Script para desplegar a Vercel

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Desplegando a Vercel...${NC}\n"

# Verificar que Vercel CLI esté instalado
if ! command -v vercel &> /dev/null
then
    echo -e "${RED}❌ Vercel CLI no está instalado${NC}"
    echo -e "${YELLOW}Instálalo con: npm install -g vercel${NC}"
    exit 1
fi

# Verificar que estamos en el directorio correcto
if [ ! -f "vercel.json" ]; then
    echo -e "${RED}❌ No se encuentra vercel.json${NC}"
    echo -e "${YELLOW}Asegúrate de estar en el directorio raíz del proyecto${NC}"
    exit 1
fi

# Verificar que existe requirements.txt
if [ ! -f "api/requirements.txt" ]; then
    echo -e "${RED}❌ No se encuentra api/requirements.txt${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Verificaciones completadas${NC}\n"

# Preguntar tipo de despliegue
echo -e "${YELLOW}¿Qué tipo de despliegue deseas hacer?${NC}"
echo "1) Preview (prueba)"
echo "2) Producción"
read -p "Selecciona (1 o 2): " deploy_type

if [ "$deploy_type" = "2" ]; then
    echo -e "\n${YELLOW}📦 Desplegando a PRODUCCIÓN...${NC}\n"
    vercel --prod
else
    echo -e "\n${YELLOW}📦 Desplegando PREVIEW...${NC}\n"
    vercel
fi

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ ¡Despliegue exitoso!${NC}\n"
    echo -e "${YELLOW}📝 No olvides:${NC}"
    echo "   1. Configurar tu API Key de OpenAI en la app"
    echo "   2. Actualizar la URL del API en el panel de configuración"
    echo "   3. Probar la conexión con el botón 'Probar'"
else
    echo -e "\n${RED}❌ Error en el despliegue${NC}"
    echo -e "${YELLOW}Revisa los logs arriba para más detalles${NC}"
    exit 1
fi

