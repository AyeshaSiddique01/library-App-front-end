import axiosInstance from "../axios";
import { GET_USER_ROLE } from "./Constants";

export const getUserRole = () => {
  try {
    const response = axiosInstance.get(`${GET_USER_ROLE}`);
    return "user";
  } catch (error) {
    console.log("Error loading role of user");
  }
};
