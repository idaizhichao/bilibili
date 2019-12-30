import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://47.101.131.65:3011"
    : "http://localhost:3011";
const service = axios.create({
  timeout: 100000,
  baseURL
});

service.interceptors.response.use(response => response.data);
export { service as axios };
