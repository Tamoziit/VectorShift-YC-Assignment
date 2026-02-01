# VectorShift-YC-Assignment

This repository contains the frontend and backend implementation for the VectorShift YC Frontend Assignment prototype.

---

## Project Structure

```
.
├── frontend/
├── backend/
├── README.md
├── LICENSE
└── .gitignore
```

---

## Environment Setup

### Frontend Environment Variables

Navigate to the `frontend/` directory and create a `.env` file with the following content:

```env
VITE_API_URL=<backend API url>
```

Replace `<backend API url>` with the actual backend endpoint (e.g., `http://127.0.0.1:8000`).

---

## Running the Frontend

From the `frontend/` directory, run:

```bash
npm install
npm run dev
```

The frontend development server will start at:

```
http://localhost:5173
```

---

## Running the Backend

From the `backend/` directory, run:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend server will start at:

```
http://localhost:8000
```

---

## Testing the Prototype

Ensure both the frontend and backend servers are running. Then open your browser and navigate to:

```
http://localhost:5173
```

You can now test the prototype end-to-end.
