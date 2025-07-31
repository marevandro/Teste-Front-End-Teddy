import api from "../services/axiosConfig";
import { AxiosError } from "axios";

interface CustomerData {
  name: string;
  salary: number;
  companyValuation: number;
}

export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
}

export async function createCustomerApi(body: CustomerData): Promise<Client> {
  try {
    const response = await api.post('/customers', body);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Erro ao criar cliente:', axiosError.response?.data);
    throw new Error('Falha ao criar cliente', { cause: axiosError });
  }
}

export async function getAllClientsApi(): Promise<Client[]> {
  try {
    const response = await api.get('/users');
    return response.data?.clients;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Erro ao buscar clientes:', axiosError.message);
    throw new Error('Falha ao carregar clientes', { cause: error });
  }
}

export async function getCustomerIdApi(id: string): Promise<Client> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`Erro ao buscar cliente ${id}:`, axiosError.response?.status);
    throw new Error(`Cliente não encontrado (ID: ${id})`, { cause: error });
  }
}

export async function updateCustomerIdApi(id: string, data: Partial<CustomerData>): Promise<Client> { // Adicionado body
  try {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`Erro ao atualizar cliente ${id}:`, axiosError.config?.data);
    throw new Error(`Falha ao atualizar cliente (ID: ${id})`, { cause: error });
  }
}

export async function deleteCustomerIdApi(id: string): Promise<void> {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`Erro ao deletar cliente ${id}:`, axiosError.response?.status);
    throw new Error(`Falha ao deletar cliente (ID: ${id})`, { cause: error });
  }
}