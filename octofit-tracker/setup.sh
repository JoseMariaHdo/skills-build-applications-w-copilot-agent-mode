#!/bin/bash

# OctoFit Tracker Setup Script
# This script sets up and initializes the OctoFit Tracker application

echo "🚀 OctoFit Tracker Setup Script"
echo "================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${BLUE}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js is installed${NC}"

# Check if MongoDB is running
echo -e "${BLUE}Checking MongoDB connection...${NC}"
if ! command -v mongosh &> /dev/null; then
    echo -e "${YELLOW}⚠️  mongosh is not installed. Make sure MongoDB server is running.${NC}"
else
    echo -e "${GREEN}✅ MongoDB tools detected${NC}"
fi

# Setup Backend
echo -e "\n${BLUE}Setting up backend...${NC}"
cd octofit-tracker/backend
echo "Installing dependencies..."
npm install

echo -e "${GREEN}✅ Backend setup complete${NC}"

# Setup Frontend
echo -e "\n${BLUE}Setting up frontend...${NC}"
cd ../frontend
echo "Installing dependencies..."
npm install

echo -e "${GREEN}✅ Frontend setup complete${NC}"

# Return to root
cd ../..

echo -e "\n${GREEN}=================================${NC}"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo -e "${GREEN}=================================${NC}"

echo -e "\n${BLUE}📚 Next Steps:${NC}"
echo ""
echo -e "${YELLOW}1. Start MongoDB:${NC}"
echo "   For macOS (with Homebrew): brew services start mongodb-community"
echo "   For Linux (Ubuntu): sudo systemctl start mongod"
echo "   For Windows: net start MongoDB"
echo ""
echo -e "${YELLOW}2. Seed the database:${NC}"
echo "   npm run seed"
echo ""
echo -e "${YELLOW}3. Start the backend (in octofit-tracker/backend):${NC}"
echo "   npm run dev"
echo ""
echo -e "${YELLOW}4. Start the frontend (in octofit-tracker/frontend):${NC}"
echo "   npm run dev"
echo ""
echo -e "${YELLOW}5. Open your browser:${NC}"
echo "   http://localhost:5173"
echo ""
