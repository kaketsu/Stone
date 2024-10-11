import axios, { AxiosResponse } from "axios";
import { message } from "antd";
import { toastHelper } from "@/utils/toastHelper";

const request = axios.create({
  baseURL: "http://localhost:7001",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

request.interceptors.response.use(
  (res: AxiosResponse) => res?.data,
  (error) => {
    const errorMsg = "something is wrong, please retry later";

    toastHelper(errorMsg);
  }
);

export default request;
