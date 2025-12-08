import express, { Express } from 'express';
import cors from 'cors';
import albumRoutes from './routes/albums';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (_req, res) => {
  res.send('Hit the /albums endpoint to retrieve a list of albums!');
});

app.use('/albums', albumRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Album API v2 is running on http://localhost:${PORT}`);
  console.log(`GET http://localhost:${PORT}/albums to retrieve all albums`);
});

export default app;
