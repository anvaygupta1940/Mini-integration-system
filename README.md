# 🧩 Mini Integration Platform

A full-stack integration between a CRM system and Inventory management using webhooks and a React frontend.

## 🏗️ Architecture

```
User (React Frontend)
       |
       V
CRM Backend (POST /customers) -- triggers webhook --> Inventory Backend (POST /packages/webhook)
       |                                                  |
   MongoDB (Customers)                             MongoDB (Packages)
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB running on cloud

### Installation

1. Install dependencies: for each folder
```bash
npm install
```

2. Start all services (CRM, Inventory, and Frontend):
```bash
npm start
```

Or start services individually:
```bash
# CRM Backend folder
npm start

# Inventory Backend folder
npm start

# Frontend
npm start
```

## 📌 Features

### CRM Backend
- Add new customers
- View all customers
- Webhooks to Inventory

### Inventory Backend
- Automatic welcome package creation
- View all packages
- Webhook endpoint

### React Frontend
- Toggle between CRM and Inventory views
- Add new customers
- View welcome packages

## 🔐 Environment Variables

Environment variables are configured in the `.env` file:

- CRM_PORT: Port for CRM backend
- CRM_DB: MongoDB connection string for CRM
- INVENTORY_PORT: Port for Inventory backend
- INVENTORY_DB: MongoDB connection string for Inventory
- INVENTORY_WEBHOOK: Webhook URL for Inventory notifications