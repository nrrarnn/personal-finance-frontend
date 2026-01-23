export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

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
  date?: string;
}

export interface TransactionResponse {
  _id: string;
  title: string;
  amount: number;
  category: Category;
  type: string;
  description: string;
  date?: string;
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

export interface CategoryStat {
  totalAmount: number;
  count: number;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  type: "income" | "expense";
}