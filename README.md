# Addis Music

A full-stack music management application built with React, Node.js, and MongoDB.

## Project Structure

```
addis_music/
├── be_addis_music/     # Backend API (Node.js + Express + MongoDB)
├── fe_addis_music/     # Frontend (React + TypeScript + Vite)
└── infra_addis_music/  # Infrastructure (Docker Compose)
```

## Prerequisites

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Docker](https://www.docker.com/) - For running MongoDB

## Getting Started

### Option 1: Docker Compose (Recommended)

Run the entire application with one command:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This will start:
- MongoDB on `localhost:27017`
- Backend API on `http://localhost:3000`
- Frontend on `http://localhost:80`

### Option 2: Manual Setup

#### 1. Start the Database

```bash
cd infra_addis_music
docker-compose -f cmps_addis_music.yaml up -d
```

#### 2. Setup and Run Backend

```bash
cd be_addis_music
bun install
bun run dev
```

#### 3. Setup and Run Frontend

```bash
cd fe_addis_music
bun install
bun run dev
```

## Environment Variables

### Backend (.env)
```
PORT=3000
MONGODB_URI=mongodb://usr_db_addis_music:pass_db_addis_music@localhost:27017/db_addis_music?authSource=admin
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:3000/api
```

## Available Scripts

### Backend
- `bun run dev` - Start development server with nodemon
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier

### Frontend
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier

## API Endpoints

### Songs
- `GET /api/songs` - Get all songs (with pagination)
- `GET /api/songs/:id` - Get song by ID
- `POST /api/songs` - Create new song
- `POST /api/songs/multiple` - Create multiple songs
- `PUT /api/songs/:id` - Update song
- `DELETE /api/songs/:id` - Delete song

### Metadata
- `GET /api/songs/metadata` - Get songs metadata (counts)
- `GET /api/songs/stats/artists` - Get artist statistics
- `GET /api/songs/stats/albums` - Get album statistics

### Filter by Field
- `GET /api/songs/by-artist/:artist` - Get songs by artist
- `GET /api/songs/by-album/:album` - Get songs by album
- `GET /api/songs/by-genre/:genre` - Get songs by genre

## Features

- ✅ CRUD operations for songs
- ✅ Pagination support
- ✅ Search and filter by artist, album, genre
- ✅ Metadata statistics
- ✅ Responsive UI with modern design
- ✅ Form validation and error handling
- ✅ Redux state management with Redux Saga
- ✅ TypeScript support

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- TypeScript
- Bun runtime

### Frontend
- React 19
- TypeScript
- Vite
- Redux Toolkit + Redux Saga
- Emotion (CSS-in-JS)
- React Icons

### Infrastructure
- Docker + Docker Compose
- MongoDB

## Deployment

### Backend (Render)
1. Set environment variables:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `PORT` - Auto-set by Render
2. Build command: `bun install`
3. Start command: `bun start`

### Frontend (Render)
1. Set environment variables:
   - `VITE_API_BASE_URL` - Your deployed backend URL
2. Build command: `bun run build`
3. Publish directory: `dist`

## Development Notes

- The backend uses MongoDB aggregation for efficient statistics
- Frontend uses environment variables for API configuration
- All forms include validation and error handling
- Pagination is implemented on both frontend and backend
- The app follows REST API conventions