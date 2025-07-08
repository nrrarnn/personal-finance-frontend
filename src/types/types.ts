export interface TokenProps {
  token: string | null;
}

export interface Category {
  _id: string;
  name: string;
  type: string;
  icon: string;
}

export interface TransactionFormInput {
  title: string;
  amount: number;
  category: string;
  description: string;
}

export interface TransactionResponse {
  _id: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface RouteParams {
  category?: string; 
}

export interface ChartData {
  [key: string]: { x: string; y: number };
}

export interface BalanceResponse {
  balance: number;
  totalIncome: number;
  totalExpense: number;
}