import request from 'supertest';
import express from 'express';
import albumsRouter from '../routes/albums';
import { albums } from '../data/albums';

const app = express();
app.use(express.json());
app.use('/albums', albumsRouter);

describe('Albums API', () => {
  it('should return all albums', async () => {
    const response = await request(app).get('/albums');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(albums.length);
  });

  it('should return a specific album', async () => {
    const response = await request(app).get('/albums/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('should return 404 for non-existent album', async () => {
    const response = await request(app).get('/albums/999');
    expect(response.status).toBe(404);
  });

  it('should add a new album', async () => {
    const newAlbum = {
      title: 'Test Album',
      artist: 'Test Artist',
      price: 9.99,
      image_url: 'http://example.com/image.jpg',
      year: 2023
    };
    const response = await request(app).post('/albums').send(newAlbum);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Album');
  });

  it('should update an album', async () => {
    const updatedAlbum = {
      title: 'Updated Album',
      artist: 'Updated Artist',
      price: 19.99,
      image_url: 'http://example.com/updated.jpg',
      year: 2024
    };
    const response = await request(app).put('/albums/1').send(updatedAlbum);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Album');
  });

  it('should delete an album', async () => {
    const response = await request(app).delete('/albums/1');
    expect(response.status).toBe(204);
  });
});