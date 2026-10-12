# Major Project 1 - E-Commerce Platform

A full-stack e-commerce web application featuring a modern React + Vite frontend and a Django REST Framework backend with JWT authentication.

---

## 🛠 Tech Stack

- **Frontend**: React, Vite, Axios, TailwindCSS / Custom CSS
- **Backend**: Python, Django, Django REST Framework, SimpleJWT, CORS Headers
- **Database**: SQLite (default development database)

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend

# Create virtual environment (optional if not present)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# (Optional) Seed initial data or create sample images
python seed_db.py
python create_sample_images.py

# Start Django development server
python manage.py runserver
```

Backend will run on `http://127.0.0.1:8000/`.

---

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173/`.

---

## 📂 Project Structure

```text
majorproject-1/
├── backend/
│   ├── backend/           # Django project configuration & settings
│   ├── base/              # Main application (models, views, serializers, urls)
│   ├── static/            # Static assets & media
│   ├── manage.py          # Django CLI
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── public/            # Public static assets
│   ├── src/               # React components, pages, context, and styles
│   ├── package.json       # Node.js dependencies & scripts
│   └── vite.config.js     # Vite configuration
├── .gitignore             # Root git ignore file
└── README.md              # Project documentation
```
