import request from "./axios";
import { Dashboard } from "@/types/index";

export const postDashboard = async (data: Dashboard) => {
  return request("/dashboard", {
    method: "POST",
    data: {
      ...data,
    },
  });
};

export const getDashboard = async (): Promise<Dashboard[]> => {
  return request("/dashboard", {
    method: "GET",
  });
};
