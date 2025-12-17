import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://asset-server.vercel.app"
});

export default axiosInstance;
