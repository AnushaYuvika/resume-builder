# Resume Builder

A full-stack Resume Builder application built using React, Node.js, Express, and MongoDB.

## Features

* Create and manage resume sections
* Profile information
* Education
* Skills
* Experience
* Projects
* Social links
* Achievements
* Leadership
* Resume output page
* MongoDB database integration
* REST API integration

## Tech Stack

### Frontend

* React
* React Router
* Vite

### Backend

* Node.js
* Express.js

### Database

* MongoDB

## Project Structure

```text
Resume Application/
├── src/
├── public/
├── package.json
├── vite.config.js
└── backend/
    ├── models/
    ├── routes/
    ├── controllers/
    ├── server.js
    └── package.json
```

## API Flow

* `POST /api/resume` — Create a new resume
* `PUT /api/resume/:resumeId` — Update resume sections
* `GET /api/resume/:resumeId` — Fetch resume data

## Running the Project

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Start the backend from the `backend` folder:

```bash
npm install
node server.js
```

> Make sure your MongoDB connection string is stored in a `.env` file and is not committed to GitHub.
