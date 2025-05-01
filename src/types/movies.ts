// Common movie fields
export interface BaseMovie {
  poster: string;
  title: string;
  description: string;
  rating: number;
  genre: string[];
  duration: number; // in minutes
  releaseDate: string; // ISO date string format
  language: string;
}

// Movie stored in DB
export interface Movie extends BaseMovie {
  _id: string;
}

// Payloads for add and update
export type AddMoviePayload = BaseMovie;

export interface UpdateMoviePayload extends BaseMovie {
  _id: string;
}
