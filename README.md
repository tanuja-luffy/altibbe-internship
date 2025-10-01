Altibbe: Product Transparency Website
A full-stack web application that uses a multi-step form to collect detailed product information and generates a comprehensive PDF report. The application features an intelligent AI service that asks dynamic follow-up questions to ensure data clarity and integrity.

Features
Multi-Step Product Form: A user-friendly, responsive form built with Next.js and Tailwind CSS for seamless data collection.

Dynamic AI Question Engine: An AI-powered service that generates relevant follow-up questions based on previous user input, ensuring detailed product transparency reports.

Secure Authentication: A complete user registration and login system with password hashing.

Product Report Generation: A backend service that generates a downloadable PDF report summarizing all collected product data.

Report Dashboard: A simple dashboard to view and download all previously submitted reports.

Tech Stack
Frontend:

Next.js: A React framework for building server-rendered and static websites.

TypeScript: Used for type-safe code.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Vercel: Hosting platform for the frontend.

Backend:

Node.js & Express: Used for building RESTful APIs.

PostgreSQL: A powerful relational database for data storage.

Bcrypt: Used for password hashing and security.

PDFKit: A Node.js library for generating PDF reports.

AI Service:

Python & Flask: A lightweight web framework for the AI microservice.

Gemini API: A large language model used for generating dynamic questions.

Setup and Installation
To run this project locally, you will need to start three separate services.

1. Database Setup (PostgreSQL)

Ensure you have PostgreSQL running on your machine.

Use a client like pgAdmin or your terminal to create a new database named altibbe_db.

Create the users and products tables by running the following SQL commands:

SQL

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
2. Backend Setup

Navigate to the backend folder and run:

Bash

npm install
node server.js
Your backend will run on http://localhost:5000.

3. AI Service Setup

Navigate to the ai-service folder.

Create a Python virtual environment and install dependencies:

Bash

python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
Create a .env file with your GEMINI_API_KEY.

Run the service:

Bash

python app.py
Your AI service will run on http://localhost:5001.

4. Frontend Setup

Navigate to the project root and run the Next.js app:

Bash

npm install
npm run dev
The frontend will be available at http://localhost:3000.

Reflection:
Building this project was a hands-on lesson in both code and character. I used Gemini to refine my AI prompt, which allowed the app to ask dynamic questions that I hadn't originally considered, making the data more comprehensive. Tools like GitHub Copilot were force multipliers, helping me quickly write boilerplate code and debug errors like the Vercel-Render connection issues. This experience reinforced the importance of building with purpose—ensuring that every line of code contributes to a clear, ethical outcome for the user. I learned that the best tech not only works well but also serves a greater purpose rooted in transparency and trust.


Contact
Name: Sarvani Tanuja


