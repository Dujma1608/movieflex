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
git clone https://github.com/yourusername/your-repo.git
cd your-repo

```

2. Install dependencies

```bash
npm install
# or
yarn install

```

3. Create a .env.local file in the root directory and add your API keys:

```bash
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
TMDB_API_READ_ACCESS_TOKEN=your_read_access_token_here

```

4. Run the development server

```bash
npm run dev
# or
yarn dev

```
