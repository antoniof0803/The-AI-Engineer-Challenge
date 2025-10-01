#!/bin/bash
# Script rápido para re-desplegar el API a Vercel

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🚀 Re-despliegue API a Vercel      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}\n"

# Verificar que estamos en el directorio correcto
if [ ! -f "app.py" ]; then
    echo -e "${RED}❌ Error: No estás en el directorio /api${NC}"
    echo -e "${YELLOW}Ejecuta: cd /Users/antonio/Work/ai/00/api${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Archivos a desplegar:${NC}"
echo "  ✓ app.py"
echo "  ✓ index.py"
echo "  ✓ vercel.json"
echo "  ✓ requirements.txt"
echo ""

echo -e "${YELLOW}🌐 Desplegando a Vercel...${NC}\n"

vercel --prod

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║   ✅ Despliegue Exitoso               ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}\n"
    
    echo -e "${BLUE}🔍 Pasos siguientes:${NC}\n"
    echo -e "1️⃣  Abre en el navegador:"
    echo -e "   ${YELLOW}https://api-ybsfnv8a1-antoniof08s-projects.vercel.app/${NC}"
    echo -e "   Deberías ver información de la API\n"
    
    echo -e "2️⃣  Prueba el health check:"
    echo -e "   ${YELLOW}https://api-ybsfnv8a1-antoniof08s-projects.vercel.app/health${NC}\n"
    
    echo -e "3️⃣  En el frontend, usa esta URL:"
    echo -e "   ${GREEN}https://api-ybsfnv8a1-antoniof08s-projects.vercel.app/chat${NC}\n"
    
    echo -e "4️⃣  Haz clic en ${BLUE}'Probar'${NC} para verificar la conexión\n"
    
    echo -e "${YELLOW}💡 Tip: Si cambió la URL, actualiza el frontend con la nueva URL de Vercel${NC}\n"
else
    echo -e "\n${RED}╔════════════════════════════════════════╗${NC}"
    echo -e "${RED}║   ❌ Error en el Despliegue           ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════╝${NC}\n"
    
    echo -e "${YELLOW}🔍 Soluciones:${NC}"
    echo "  1. Revisa los logs arriba"
    echo "  2. Verifica que requirements.txt tenga todas las dependencias"
    echo "  3. Ejecuta: vercel logs --follow"
    echo ""
    exit 1
fi

