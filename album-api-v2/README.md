# Album API v2

Node.js/TypeScript REST API for managing music albums. This is a rewrite of the original .NET `albums-api` service using modern Node.js technologies.

## Features

- Full CRUD operations (Create, Read, Update, Delete) for albums
- In-memory data storage with 6 sample albums
- RESTful API endpoints compatible with the existing album-viewer frontend
- TypeScript for type safety and better developer experience
- Comprehensive unit tests with Jest
- CORS enabled for cross-origin requests
- Runs on port 3000

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

```bash
npm install
```

## Development

Start the API in development mode with auto-reload:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Build and Production

Build the TypeScript project:

```bash
npm run build
```

Start the compiled API:

```bash
npm start
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

## API Endpoints

### Get All Albums

```http
GET /albums
```

Returns a list of all albums.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "You, Me and an App Id",
    "artist": "Daprize",
    "price": 10.99,
    "image_url": "https://aka.ms/albums-daprlogo"
  }
]
```

### Get Album by ID

```http
GET /albums/:id
```

Returns a specific album by ID.

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "You, Me and an App Id",
  "artist": "Daprize",
  "price": 10.99,
  "image_url": "https://aka.ms/albums-daprlogo"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Album not found"
}
```

### Create Album

```http
POST /albums
Content-Type: application/json

{
  "title": "New Album",
  "artist": "Artist Name",
  "price": 12.99,
  "image_url": "https://example.com/image.jpg"
}
```

**Response (201 Created):**
```json
{
  "id": 7,
  "title": "New Album",
  "artist": "Artist Name",
  "price": 12.99,
  "image_url": "https://example.com/image.jpg"
}
```

### Update Album

```http
PUT /albums/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "artist": "Updated Artist",
  "price": 13.99,
  "image_url": "https://example.com/new-image.jpg"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Updated Title",
  "artist": "Updated Artist",
  "price": 13.99,
  "image_url": "https://example.com/new-image.jpg"
}
```

### Delete Album

```http
DELETE /albums/:id
```

**Response (204 No Content):** Album deleted successfully

**Response (404 Not Found):**
```json
{
  "error": "Album not found"
}
```

## Sample Data

The API comes with 6 sample albums pre-loaded:

1. **You, Me and an App Id** - Daprize - $10.99
2. **Seven Revision Army** - The Blue-Green Stripes - $13.99
3. **Scale It Up** - KEDA Club - $13.99
4. **Lost in Translation** - MegaDNS - $12.99
5. **Lock Down Your Love** - V is for VNET - $12.99
6. **Sweet Container O' Mine** - Guns N Probeses - $14.99

## Important Notes

- **Data Persistence**: Album data is stored in memory. Changes are lost when the application restarts.
- **CORS**: The API is configured to accept requests from all origins (`*`), making it suitable for development with the album-viewer frontend running on a different port.
- **Port**: The API listens on port 3000 by default.

## Integration with Album Viewer

The album-viewer frontend (running on port 3001) is configured to proxy requests to this API:

```
Frontend: http://localhost:3001
API: http://localhost:3000
```

Start both services:

1. Terminal 1: `cd album-api-v2 && npm run dev`
2. Terminal 2: `cd album-viewer && npm run dev`

Then access the application at `http://localhost:3001`

## Project Structure

```
album-api-v2/
├── src/
│   ├── index.ts                 # Express server setup
│   ├── models/
│   │   └── album.ts             # Album interface and data store
│   └── routes/
│       ├── albums.ts            # Album endpoints
│       └── albums.test.ts        # Unit tests
├── dist/                         # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## License

MIT
