import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://z.daizhichao.top/api/"
    : "http://localhost:3011";
const service = axios.create({
  timeout: 100000,
  baseURL
});

service.interceptors.response.use(response => response.data);
export { service as axios };
