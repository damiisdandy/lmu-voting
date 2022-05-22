import Axios from "axios";
import config from "../config";

const axiosInstance = Axios.create({
  baseURL: `${config.apiUrl}/api/v1`,
});

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
