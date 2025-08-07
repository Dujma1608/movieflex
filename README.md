# My Next.js Movie App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This app fetches and displays movie data from The Movie Database (TMDb) API.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or newer
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A TMDb API key (sign up for free at https://www.themoviedb.org/documentation/api)
- Docker and Docker Compose (optional, for containerized setup)

---

### Setup

1. Clone the repository

```bash
git clone https://github.com/Dujma1608/movieflex.git
cd movieflex

```

2. Install dependencies

```bash
npm install
# or
yarn install

```

3. Create a .env.local file in the root directory and add your API keys:

```bash
NEXT_PUBLIC_TMDB_API_KEY=6a2540c662623849a2fc6007cb94ea25
TMDB_API_KEY=6a2540c662623849a2fc6007cb94ea25
TMDB_API_READ_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTI1NDBjNjYyNjIzODQ5YTJmYzYwMDdjYjk0ZWEyNSIsIm5iZiI6MTc1Mzc5Mjk2Ny45ODIsInN1YiI6IjY4ODhjMWM3ODdiOTgxMjc5YzU1ZmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rusT1y_57PEo6k6hSOcb4r9BNkkQ3O1_ik0pt-n2oxo


```

4. Run the development server

```bash
npm run dev
# or
yarn dev

```

## Running with Docker

If you prefer to run the app inside a Docker container, follow these steps:

1. Make sure Docker and Docker Compose are installed on your machine.

2. Build and start the Docker container:

```bash
docker-compose up --build

```

3. Open your browser and visit http://localhost:3000 to access the app
