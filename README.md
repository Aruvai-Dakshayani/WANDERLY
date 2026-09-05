# ✈️ WANDERLY

### Full-Stack Travel Booking & Trip Management Platform

WANDERLY is a full-stack travel booking web application designed to provide users with a smooth and modern platform for discovering destinations, exploring travel packages, managing wishlists, and making travel bookings.

The application follows a frontend–backend architecture where a React frontend communicates with a Django REST API, with MySQL used for persistent data storage.

---

## 🌍 Project Overview

WANDERLY allows users to:

- Explore popular travel destinations
- Search and discover destinations
- View detailed destination information
- Explore travel packages
- View package details
- Create an account and securely log in
- Add destinations to a personal wishlist
- Remove destinations from the wishlist
- Book trips with selected travel dates and number of travelers
- View and manage their bookings
- Cancel bookings
- Manage their user profile
- Access protected features through authentication

---

## 🚀 Key Features

### 👤 User Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Automatic access-token refresh
- Logout functionality

### 🗺️ Destinations

- Browse travel destinations
- Search destinations
- Destination details page
- Destination location information
- Destination ratings and reviews count
- Dynamic destination data from Django API

### 🎒 Travel Packages

- Browse travel packages
- Package search and exploration
- Package details
- Duration information
- Package pricing
- Package ratings
- Book Now functionality

### ❤️ Wishlist

- Add destinations to wishlist
- Remove destinations from wishlist
- Wishlist data stored in the backend
- User-specific wishlist
- Protected wishlist operations

### 📅 Booking Management

- Select travel date
- Select number of travelers
- Calculate total booking price
- Create bookings
- View booking history
- Cancel bookings
- User-specific booking records
- Booking status management

### 👤 User Profile

- Display user information
- View wishlist count
- View booking count
- Access wishlist
- Access booking history
- Logout functionality

### 📱 Responsive Design

- Desktop-friendly interface
- Tablet support
- Mobile-responsive navigation
- Responsive destination and package cards
- Mobile-friendly layouts

---

## 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)
- React
- React Router
- Redux Toolkit
- Axios
- Lucide React

### Backend

- Python
- Django
- Django REST Framework
- Django REST Framework Simple JWT
- django-cors-headers

### Database

- MySQL

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Vite
- MySQL Server

---

## 🏗️ Application Architecture

```text
                    WANDERLY
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
   React Frontend              Django Backend
          │                         │
          │                    Django REST API
          │                         │
          └────────── API ──────────┘
                                    │
                                    ▼
                              MySQL Database
```

---

## 📁 Project Structure

```text
WANDERLY/
│
├── backend/
│   ├── core/
│   ├── config/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   └── .gitignore
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd WANDERLY
```

---

# 🐍 Backend Setup

Open a terminal and navigate to the backend:

```bash
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment — Windows

```powershell
.\venv\Scripts\Activate.ps1
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🗄️ MySQL Database Setup

Make sure MySQL Server is installed and running.

Create the WANDERLY database:

```sql
CREATE DATABASE wanderly_db;
```

---

# 🔐 Backend Environment Configuration

Create a file named:

```text
backend/.env
```

Use `backend/.env.example` as the template.

Example:

```env
DJANGO_SECRET_KEY=your_secret_key
DB_NAME=wanderly_db
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=3306
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
```

> ⚠️ Never upload the actual `.env` file to GitHub.

---

# 🧱 Django Database Setup

From the `backend` directory:

```bash
python manage.py makemigrations
```

Then:

```bash
python manage.py migrate
```

---

# 👨‍💻 Create Admin User

Create a Django administrator account:

```bash
python manage.py createsuperuser
```

Follow the instructions displayed in the terminal.

---

# ▶️ Run Django Backend

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

Django Admin:

```text
http://127.0.0.1:8000/admin/
```

---

# ⚛️ Frontend Setup

Open a **new terminal**.

Navigate to the frontend:

```bash
cd WANDERLY/frontend
```

Install dependencies:

```bash
npm install
```

---

# 🔐 Frontend Environment Configuration

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

> ⚠️ Never upload the actual `.env` file to GitHub.

---

# ▶️ Run React Frontend

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173/
```

---

# 🔄 Running the Complete Application

Two terminals are required.

### Terminal 1 — Backend

```bash
cd WANDERLY/backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

### Terminal 2 — Frontend

```bash
cd WANDERLY/frontend
npm run dev
```

Then open:

```text
http://localhost:5173/
```

---

# 🔌 REST API

The React frontend communicates with the Django backend using REST APIs.

### Destinations

```text
GET    /api/destinations/
```

### Packages

```text
GET    /api/packages/
```

### Authentication

```text
POST   /api/register/
POST   /api/login/
POST   /api/token/refresh/
```

### Bookings

```text
GET    /api/bookings/
POST   /api/bookings/
DELETE /api/bookings/<id>/
```

### Wishlist

```text
GET    /api/wishlist/
POST   /api/wishlist/
DELETE /api/wishlist/<id>/
```

Protected endpoints require JWT authentication.

---

# 🔐 Authentication Flow

```text
User
 │
 ▼
React Login Page
 │
 ▼
Django Authentication API
 │
 ▼
JWT Access + Refresh Tokens
 │
 ▼
Authenticated API Requests
 │
 ▼
Django REST API
 │
 ▼
MySQL Database
```

---

# 🧪 Application Testing

After starting both servers, test the following:

1. Open the WANDERLY homepage
2. Search for a destination
3. Open destination details
4. Register a new account
5. Log in
6. Add a destination to wishlist
7. Open the wishlist
8. Explore travel packages
9. Open package details
10. Create a booking
11. Open My Bookings
12. Cancel a booking
13. Open Profile
14. Log out
15. Log in again

---

# 🛡️ Security

The project uses basic security practices including:

- Environment variables for sensitive configuration
- Django password hashing
- JWT authentication
- Protected API endpoints
- User-specific bookings
- User-specific wishlists
- CORS configuration
- `.gitignore` protection for sensitive files

Sensitive files such as `.env`, virtual environments, and `node_modules` are excluded from version control.

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

- Full-stack web development
- React component architecture
- React Router
- Redux Toolkit
- REST API integration
- Axios
- Django REST Framework
- JWT authentication
- MySQL database integration
- CRUD operations
- Protected routes
- State management
- Responsive UI development
- Git and GitHub workflow
- Environment configuration

---

# 🔮 Future Improvements

Possible future enhancements:

- Online payment integration
- Hotel booking
- Flight booking
- User reviews and comments
- Advanced destination filtering
- Email booking confirmation
- Travel itinerary generation
- Google Maps integration
- Image upload functionality
- Admin analytics dashboard
- Automated testing
- Production deployment

---

# 👩‍💻 Project

**WANDERLY — Full-Stack Travel Booking & Trip Management Platform**

Built using:

**React + Redux Toolkit + Django REST Framework + MySQL**
