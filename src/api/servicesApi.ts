import { BalanceResponse, Category, TransactionResponse, CategoryStat } from "../types/types";
import api from "./api";

interface APIWrapper<T> {
  success: boolean;
  data: T;
}

const fetchData = async <T>(endpoint: string, token: string): Promise<T> => {
  try {
    const response = await api.get<T>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const getTransactions = async (
  token: string,
  type?: string,
  month?: number,
  year?: number,
  categoryId?: string
): Promise<TransactionResponse[]> => {
  const params: Record<string, string | number> = {};
  if (type) params.type = type;
  if (month) params.month = month;
  if (year) params.year = year;
  if (categoryId) params.categoryId = categoryId;

  const response = await api.get<TransactionResponse[]>("/transactions", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return response.data;
};

export const getIncomes = (token: string): Promise<TransactionResponse[]> => getTransactions(token, 'income');
export const getExpenses = (token: string): Promise<TransactionResponse[]> => getTransactions(token, 'expense');
export const getByCategories = (token: string, type: string, categoryId: string): Promise<TransactionResponse[]> => getTransactions(token, type, undefined, undefined, categoryId);
export const getCategories = (token: string): Promise<Category[]> => fetchData('/categories', token);
export const getBalance = async (token: string): Promise<BalanceResponse> => {
  const response = await fetchData<APIWrapper<BalanceResponse>>('/balance', token);
  return response.data;
};

export interface CategoryTransactionResponse {
  totalAmount: number;
  transactions: TransactionResponse[];
}

export const getCategoryTransactions = async (
  token: string,
  categoryId: string,
  month: number,
  year: number
): Promise<CategoryTransactionResponse> => {
  const response = await api.get<CategoryTransactionResponse>("/transactions/category", {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      categoryId,
      month,
      year,
    },
  });
  return response.data;
};

export const getCategoryStats = async (
  token: string,
  month: number,
  year: number
): Promise<CategoryStat[]> => {
  const response = await api.get<APIWrapper<CategoryStat[]>>('/stats/category', {
    headers: { Authorization: `Bearer ${token}` },
    params: { month, year },
  });
  return response.data.data;
};