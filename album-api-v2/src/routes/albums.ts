import { Router } from 'express';
import { albums } from '../data/albums';
import { Album } from '../models/Album';

const router = Router();

// GET /albums - List all albums
router.get('/', (req, res) => {
  res.json(albums);
});

// GET /albums/:id - Get album by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const album = albums.find(a => a.id === id);
  if (album) {
    res.json(album);
  } else {
    res.status(404).json({ message: 'Album not found' });
  }
});

// POST /albums - Add new album
router.post('/', (req, res) => {
  const { title, artist, price, image_url, year } = req.body;
  const newId = Math.max(...albums.map(a => a.id)) + 1;
  const newAlbum = new Album(newId, title, artist, price, image_url, year);
  albums.push(newAlbum);
  res.status(201).json(newAlbum);
});

// PUT /albums/:id - Update album
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = albums.findIndex(a => a.id === id);
  if (index !== -1) {
    const { title, artist, price, image_url, year } = req.body;
    albums[index] = new Album(id, title, artist, price, image_url, year);
    res.json(albums[index]);
  } else {
    res.status(404).json({ message: 'Album not found' });
  }
});

// DELETE /albums/:id - Delete album
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = albums.findIndex(a => a.id === id);
  if (index !== -1) {
    albums.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Album not found' });
  }
});

export default router;