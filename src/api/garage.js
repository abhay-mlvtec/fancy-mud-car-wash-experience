import API from "./axiosInstance";

export const getGaragesByPincode = async (pincode) => {
  try {
    const response = await API.get(`/garage/garages/${pincode}`);
    return response.data; // 🔹 Ensure response.data is returned
  } catch (error) {
    console.error("Error fetching garages:", error);
    return []; // 🔹 Return an empty array if an error occurs
  }
};
