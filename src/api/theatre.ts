import { TheatreFormValues, UpdateTheatrePayload } from "../types/theatre";
import axiosInstance from "./apiClient";

export const getAllTheatres = async () => {
  try {
    const response = await axiosInstance.get("api/theatre/get-all-theatre");
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const addTheatre = async (value: TheatreFormValues) => {
  try {
    const response = await axiosInstance.post("api/theatre/add-theatre", value);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const updateTheatre = async (value: UpdateTheatrePayload) => {
  try {
    const response = await axiosInstance.put(
      "api/theatre/update-theatre",
      value
    );
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const deleteTheatre = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/theatre/delete-theatre/${id}`
    );
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const getTheatreById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/theatre/get-theatre/${id}`);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};
