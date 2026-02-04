// API functions for album operations

import type { Album } from '../types/album';

const API_BASE_URL = import.meta.env.VITE_ALBUM_API_HOST || 'http://localhost:3000';

/**
 * Retrieves albums from the API and sorts them by the specified field.
 * @param sortBy - The field to sort by: 'title', 'artist', 'price', or 'year'.
 * @param ascending - Whether to sort in ascending order (default: true).
 * @returns A promise that resolves to the sorted array of albums.
 */
export async function getAlbumsSorted(sortBy: 'title' | 'artist' | 'price' | 'year', ascending: boolean = true): Promise<Album[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/albums`);
    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.statusText}`);
    }
    const albums: Album[] = await response.json();

    return albums.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'artist':
          aValue = a.artist.toLowerCase();
          bValue = b.artist.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'year':
          aValue = a.year;
          bValue = b.year;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return ascending ? -1 : 1;
      if (aValue > bValue) return ascending ? 1 : -1;
      return 0;
    });
  } catch (error) {
    console.error('Error fetching or sorting albums:', error);
    throw error;
  }
}