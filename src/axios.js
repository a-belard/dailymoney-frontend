import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://dailymoney.onrender.com/",
});
// http://localhost:5000
export default axiosInstance;
