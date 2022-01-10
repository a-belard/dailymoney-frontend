import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://dailymoneybusiness.herokuapp.com",
});

export default axiosInstance;
