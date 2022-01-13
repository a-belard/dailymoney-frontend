import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://dailymoneybusiness.herokuapp.com/",
});
// http://localhost:5000
export default axiosInstance;
