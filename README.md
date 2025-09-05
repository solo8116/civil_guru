
# Civil Guru – Lead Management Backend

Civil Guru is a **production-ready Node.js + TypeScript backend** for managing leads, built with **Express** and **Prisma (MongoDB)**.  
It follows a **clean architecture** with DTO validation, repository pattern, and layered error handling.

---

## 🚀 Features
- Lead capture with detailed fields (name, email, phone, qualification, interests, etc.).
- Pagination & filtering (`status`, `source`, `city`, etc.).
- Input validation with `class-validator` and `class-transformer`.
- Database access via **Prisma ORM with MongoDB**.
- Centralized error handling for **Prisma** and **global errors**.
- Clean layered architecture (Controller → Interactor → Repository).

---

## ⚙️ Tech Stack
- **Backend**: Node.js, Express, TypeScript  
- **Database**: MongoDB (via Prisma)  
- **Validation**: class-validator, class-transformer  
- **Error Handling**: Custom middlewares (Prisma & Global)  
- **Formatting**: Prettier for code style  

---

## 📂 Project Structure
```
civil_guru/
│── app.ts                 # Entry point
│── prisma/schema.prisma   # Prisma schema (MongoDB)
│── src/
│   ├── common/            # DTOs, constants, enums
│   ├── controllers/       # Express controllers
│   ├── entites/           # Entity definitions
│   ├── interactors/       # Business logic layer
│   ├── interfaces/        # Interfaces for contracts
│   ├── middlewares/       # Validation & error middlewares
│   ├── repositories/      # Database access layer
│   ├── routers/           # Express routers
│   ├── utils/             # Utility helpers
│   └── server.ts          # Express server config
│── .env.example           # Env variables (DB, PORT)
│── package.json
│── tsconfig.json
│── .prettierrc
```

---

## 📌 API Endpoints
**Base URL:** `http://localhost:3000/api/lead`

| Method | Endpoint   | Description               |
|--------|------------|---------------------------|
| POST   | `/`        | Create a new lead         |
| GET    | `/`        | Get all leads (paginated) |
| GET    | `/filter`  | Filter/search leads       |

---

## 🧑‍💻 Example Requests

### 1. Create Lead
**Request**
```http
POST /api/lead
Content-Type: application/json

{
  "name": "Alice Johnson",
  "phone": "9876543210",
  "alternatePhone": "9124452789",
  "email": "alice@example.com",
  "status": "Follow-Up",
  "qualification": "Masters",
  "interestField": "Web Development",
  "source": "Website",
  "assignedTo": "admin_user_123",
  "jobInterest": "Data Science",
  "state": "Maharashtra",
  "city": "Mumbai",
  "passoutYear": 2022,
  "heardFrom": "LinkedIn"
}
```

**Response**
```json
{
  "success": true,
  "message": "lead created successfully"
}
```

### 2. Get All Leads
**Request**
```http
GET /api/lead
```

**Response**
```json
{
  "success": true,
  "message": "leads fetched successfully",
  "data": {
    "currentPage": 1,
    "nextPage": null,
    "totalItems": 3,
    "totalPages": 1,
    "data": [ { ...lead objects... } ]
  }
}
```

### 3. Filter Leads
**Request**
```http
GET /api/lead/filter?status=Qualified&source=Website&operator=AND
```

**Response**
```json
{
  "success": true,
  "message": "leads filtered successfully",
  "data": {
    "currentPage": 1,
    "nextPage": null,
    "totalItems": 1,
    "totalPages": 1,
    "data": [ { ...filtered lead... } ]
  }
}
```

---

## ⚡ Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/solo8116/civil_guru.git
cd civil_guru
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory. Use `.env.example` as a reference:

```env
# MongoDB connection string
DATABASE_URL="your-mongodb-connection-url"

# Server Port
PORT=3000
```

Example for MongoDB Atlas:
```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/civilguru"
PORT=3000
```

### 4. Setup Prisma
```bash
npm run db
```

### 5. Run in Development
```bash
npm run dev
```

### 6. Build and Run in Production
```bash
npm run build
npm run serve
```

## POST /api/lead
<img width="1920" height="1078" alt="Screenshot from 2025-09-03 16-02-35" src="https://github.com/user-attachments/assets/722541b0-d5f4-4653-a4f9-cec518acda2d" />

## GET /api/lead
<img width="1920" height="1080" alt="Screenshot from 2025-09-05 11-51-54" src="https://github.com/user-attachments/assets/6cbe7b2d-037d-4626-b24e-179b3a247283" />

## GET /api/lead/filter
<img width="1920" height="1080" alt="Screenshot from 2025-09-05 11-52-08" src="https://github.com/user-attachments/assets/ed92b8b4-a727-48e8-b47a-4a1090c9b2f3" />

