import axiosInstance from "../axios";
import { GET_USER_ROLE } from "./Constants";

export const getUserRole = async () => {
  try {
    const response = await axiosInstance.get(GET_USER_ROLE);
    return response.data;
  } catch (error) {
    return [];
  }
};
