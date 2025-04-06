export interface Movie {
  _id: string;
  poster: string;
  title: string;
  description: string;
  rating: number;
  genre: string;
  duration: number; // in minutes
  releaseDate: string; // ISO date string format
  language: string;
}
