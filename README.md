# Programming Language Inventory

A web-based inventory management system for tracking programming languages, frameworks, and their creators. Built with Node.js, Express, and PostgreSQL.

## 🛠 Technologies

- **Backend**: Node.js, Express 5.1.0
- **Database**: PostgreSQL
- **Templating**: EJS
- **Validation**: Express-validator

## 📊 Database Schema

```
Authors (1) ←--→ (0..n) Languages ←--→ (0..n) Frameworks
                      ↑
Authors (1) ←--→ (0..n) Frameworks
```

Three main entities with proper foreign key relationships and cascading rules.

## 🚀 Getting Started

1. **Clone and install**
   ```bash
   git clone https://github.com/mamahany/inventory-application.git
   cd inventory-application
   npm install
   ```

2. **Set up environment variables**
   
   Create `.env` file:
   ```env
   DATABASE_HOST=localhost
   DATABASE_USER=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=inventory_db
   DATABASE_PORT=5432
   PORT=3000
   ```

3. **Create and seed database**
   ```bash
   createdb inventory_db
   node db/populatedb.js "postgresql://username:password@localhost:5432/inventory_db"
   ```

4. **Start the application**
   ```bash
   npm run app
   ```

Visit `http://localhost:3000` to use the app.

## 📱 Features

- **Full CRUD Operations**: Create, read, update, delete for all entities
- **Data Relationships**: Proper foreign key constraints
- **Form Validation**: Server-side validation with error messages
- **Responsive Design**: Clean, modern interface

## 🔧 Routes Structure

All entities follow the same pattern:
- `GET /{entity}` - List all
- `GET /{entity}/new` - Create form
- `POST /{entity}/new` - Create item
- `GET /{entity}/:id` - View details
- `GET /{entity}/:id/edit` - Edit form
- `POST /{entity}/:id/edit` - Update item
- `GET /{entity}/:id/delete` - Delete item

Available entities: `language`, `author`, `framework`

## 🎯 Project Purpose

Built as part of The Odin Project's Node.js course to demonstrate:
- Express.js application structure
- PostgreSQL integration and relationships
- MVC architecture
- CRUD operations with validation

---

**The Odin Project - Node.js Course**