import { BalanceResponse, Category, TransactionResponse } from "../types/types";
import api from "./api";

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

export const getIncomes = (token: string): Promise<TransactionResponse[]> => fetchData('/incomes', token);
export const getExpenses = (token: string): Promise<TransactionResponse[]> => fetchData('/expenses', token);
export const getByCategories = (token: string, transaction:string , category: string): Promise<TransactionResponse[]> => fetchData(`/${transaction}/${category}`, token);
export const getCategories = (token: string): Promise<Category[]> => fetchData('/categories', token);
export const getBalance = (token: string): Promise<BalanceResponse>  => fetchData('/balance', token)