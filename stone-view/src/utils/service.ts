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

export const getAllDashboards = async (): Promise<Dashboard[]> => {
  return request("/dashboard", {
    method: "GET",
  });
};


export const getDashboardByDate = async (date: string): Promise<Dashboard> => {
  return request(`/dashboard/date/${date}`, {
    method: "GET",
  });
};

export const getDashboardByDateRange = async (startDate:string, endDate: string):Promise<Dashboard[]> => {
  return request(`/dashboard/date/range`, {
    method: "POST",
    data: {
      startDate,
      endDate,
    }
  });
};

export const crawlDashboardByDate = async (date: string): Promise<Dashboard> => {
  return request(`/dashboard/crawl/${date}`, {
    method: "GET",
  });
};