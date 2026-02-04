import express from 'express';
import albumsRouter from './routes/albums';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/albums', albumsRouter);

app.listen(port, () => {
  console.log(`Album API v2 running on http://localhost:${port}`);
});