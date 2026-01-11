import { BalanceResponse, Category, TransactionResponse } from "../types/types";
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
  const params: Record<string, any> = {};
  if (type) params.type = type;
  if (month) params.month = month;
  if (year) params.year = year;
  if (categoryId) params.category = categoryId;

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
  // Kita kasih tahu fetchData kalau bentuk datanya ada wrapper APIWrapper
  const response = await fetchData<APIWrapper<BalanceResponse>>('/balance', token);
  
  // Lalu kita return isinya saja (.data)
  return response.data;
};