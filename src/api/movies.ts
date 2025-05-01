import { AddMoviePayload, UpdateMoviePayload } from "../types/movies";
import axiosInstance from "./apiClient";

export const getMovies = async () => {
  try {
    const response = await axiosInstance.get("api/movies/get-movies");
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const addMovie = async (value: AddMoviePayload) => {
  try {
    const response = await axiosInstance.post("api/movies/add-movie", value);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const updateMovie = async (value: UpdateMoviePayload) => {
  try {
    const response = await axiosInstance.put("api/movies/update-movie", value);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const deleteMovie = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/movies/delete-movie/${id}`
    );
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};
