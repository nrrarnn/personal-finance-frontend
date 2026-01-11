import { useQuery } from '@tanstack/react-query'
import { TransactionResponse, Category, BalanceResponse } from '../types/types'
import { getBalance, getByCategories, getCategories, getExpenses, getIncomes } from '../api/servicesApi'

export const useIncomes = (token: string) =>
  useQuery<TransactionResponse[]>({
    queryKey: ['transactions', 'income'],
    queryFn: () => getIncomes(token),
    enabled: !!token, 
  })

export const useExpenses = (token: string) =>
  useQuery<TransactionResponse[]>({
    queryKey: ['transactions', 'expense'],
    queryFn: () => getExpenses(token),
    enabled: !!token,
  })

export const useCategories = (token: string) =>
  useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => getCategories(token),
    enabled: !!token,
  })

export const useBalance = (token: string) =>
  useQuery<BalanceResponse>({
    queryKey: ['balance'],
    queryFn: () => getBalance(token),
    enabled: !!token,
  })

export const useByCategory = (token: string, type: string, categoryId: string) =>
  useQuery<TransactionResponse[]>({
    queryKey: ['byCategory', type, categoryId],
    queryFn: () => getByCategories(token, type, categoryId),
    enabled: !!token && !!type && !!categoryId,
  })
