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

export interface AddIncomeProps extends TokenProps {
  editingIncome: TransactionResponse | null; 
  setEditingIncome: (income: TransactionResponse | null) => void; 
}
export interface AddExpenseProps extends TokenProps {
  editingExpense: TransactionResponse | null; 
  setEditingExpense: (expense: TransactionResponse | null) => void; 
}