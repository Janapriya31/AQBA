# Automated Question Builder Application (AQBA)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Uploads](#file-uploads)
- [Role-Based Access Control](#role-based-access-control)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Automated Question Builder Application (AQBA) is designed to help educators create and manage question banks efficiently. The application uses AI technology for generating questions and allows users to upload curricula in various formats.

## Features
- Generate question banks based on topics and difficulty levels using AI.
- Upload curricula in PDF, CSV, Word, and Excel formats.
- Support for multiple question types, including MCQs, coding challenges, and case studies.
- Role-based access control for administrators, trainers, and users.
- Email and in-app notifications for user actions (e.g., uploads, assessments).

## Technologies Used
- **Frontend:** React, Material-UI (or any other library used)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Gemini API
- **File Uploads:** Multer
- **Real-Time Notifications:** Socket.io

## Installation
To install the application, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Janapriya31/AQBA.git
   cd AQBA


Install dependencies for both frontend and backend:

bash
# Backend
cd aqba-backend
npm install

# Frontend
cd aqba-frontend
npm install


# Create a .env file in the backend directory and add the necessary environment variables:
MONGO_URI=your_mongo_db_uri
TOKEN_SECRET=your_token_secret
GEMINI_API_KEY=your_gemini_api_key


# To run the application:
 
Start the backend server:
(bash)
cd aqba-backend


npm start
Start the frontend development server:
cd aqba-frontend
npm start
