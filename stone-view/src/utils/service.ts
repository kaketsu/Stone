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


export const getAllLimitUpByDate = async (date: string): Promise<any[]> => {
  return request(`/stock-limit-up/date/${date}`, {
    method: "GET",
  });
};



export const getLimitUpStatisticsByDate = async (date: string): Promise<Dashboard> => {
  return request(`/stock-limit-up-statistics/date/${date}`, {
    method: "GET",
  });
};


export const getLimitUpStatistics = async (): Promise<any[]> => {
  return request(`/stock-limit-up-statistics`, {
    method: "GET",
  });
};
