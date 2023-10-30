import { GET_USER_ROLE } from "./Constants";

export const getUserRole = () => {
  try {
    const response = axiosInstance.get(`${GET_USER_ROLE}`);
    return response.data;
  } catch (error) {
    console.log("Error loading role of user");
  }
};
