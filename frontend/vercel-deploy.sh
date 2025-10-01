#!/bin/bash
# Script helper para desplegar en Vercel con la versión correcta de Node

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Preparando despliegue en Vercel...${NC}"

# Cargar nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Usar Node 18
echo -e "${YELLOW}📦 Cambiando a Node 18...${NC}"
nvm use 18

# Verificar versión
NODE_VERSION=$(node --version)
echo -e "${GREEN}✓ Usando Node $NODE_VERSION${NC}"

# Ejecutar Vercel con los argumentos pasados al script
echo -e "${YELLOW}🌐 Ejecutando Vercel...${NC}"
vercel "$@"
