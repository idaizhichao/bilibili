import axios from "axios";

const service = axios.create({
  timeout: 100000,
  baseURL: "http://localhost:3011"
});

service.interceptors.response.use(response => response.data);
export { service as axios };
