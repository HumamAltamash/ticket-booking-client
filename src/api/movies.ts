import axiosInstance from "./apiClient";

export const getMovies = async () => {
  try {
    const response = await axiosInstance.get("api/movies/get-movies");
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const addMovie = async (value: any) => {
  try {
    const response = await axiosInstance.post("api/movies/add-movie", value);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const updateMovie = async (value: any) => {
  try {
    const response = await axiosInstance.put("api/movies/update-movie", value);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const deleteMovie = async (value: any) => {
  try {
    const response = await axiosInstance.delete("api/movies/delete-movie", {
      data: value,
    });
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};
