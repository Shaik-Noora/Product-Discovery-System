# Intelligent Product Discovery System

## Overview

This project implements a mini product discovery experience combining a backend API, a React frontend, and AI-powered natural language querying using an LLM.

Users can browse a product catalog or ask questions in natural language such as:

- "best laptop for students"
- "cheap gaming keyboard"
- "monitor for productivity"

The backend interprets the query using an LLM and returns relevant products along with an AI-generated explanation.

---

## Features

- Product catalog browsing
- Category-based filtering
- Natural language product search
- AI-generated product summaries
- Responsive modern UI
- Structured backend API
- Environment-based configuration

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Fetch API
- Component-based architecture

### Backend
- Node.js
- Express.js
- Gemini LLM API
- REST API design

---

## Project Structure


product-discovery-system/
│
├── backend/
│ ├── data/
│ │ ├── products.json
│ │ └── images/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── AskQuery.jsx
│ │ ├── ProductList.jsx
│ │ └── index.css
│
└── README.md


---

## Installation

### 1. Clone repository


git clone <repo-url>
cd product-discovery-system


---

### 2. Backend Setup


cd backend
npm install


Create `.env` file:


PORT=5000
GEMINI_API_KEY=your_api_key_here


Run backend:


node server.js


---

### 3. Frontend Setup


cd frontend
npm install
npm run dev


Frontend runs at:


http://localhost:5173


---

## API Endpoints

### GET /api/products
Returns full product catalog.

### POST /api/ask

Request:


{
"query": "best laptop for students"
}


Response:


{
"summary": "AI explanation",
"products": [...]
}


---

## AI Integration

The backend sends product context and user query to the Gemini LLM.  
The model returns structured JSON containing recommended product IDs and a short explanation.  
The backend maps IDs to catalog items before returning results to the frontend.

---

## Design Decisions

- No database used; mock JSON catalog for simplicity.
- LLM used for intent interpretation rather than direct UI generation.
- Frontend separates browsing mode and AI-assisted discovery mode.
- Environment variables protect API credentials.

---

## Future Improvements

- Product detail page
- Result ranking
- Persistent search history
- Deployment to cloud platforms

---

## Author

Product Discovery System implementation demonstrating backend APIs, frontend integration, and LLM-based natural language interaction.