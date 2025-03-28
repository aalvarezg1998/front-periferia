import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { PathEnum } from '../enums/PathEnum';
class ApiClient {
  private readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000, // 10 segundos
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error instanceof Error ? error : new Error(error.message || 'Unknown error'))
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          switch (error.response.status) {
            case 401:
              // Token inválido o expirado
              localStorage.removeItem('token');
              localStorage.removeItem('user');
               window.location.href = '/login';
              break;
            case 403:
              // Acceso prohibido
              console.error('Acceso prohibido');
              break;
            case 404:
              // Recurso no encontrado
              console.error('Recurso no encontrado');
              break;
            case 500:
              // Error interno del servidor
              console.error('Error interno del servidor');
              break;
          }
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor');
        } else {
          console.error('Error al configurar la solicitud', error.message);
        }
        return Promise.reject(error instanceof Error ? error : new Error(error.message || 'Unknown error'));
      }
    );
  }

  // Métodos genéricos para realizar solicitudes
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  }
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost';
const API_PORT_USER = import.meta.env.VITE_PORT_USER ?? '8085';
const API_PORT_PUBLICATIONS = import.meta.env.VITE_PORT_PUBLICATIONS ?? '8086';
const API_PORT_AUTH = import.meta.env.VITE_PORT_AUTH ?? '8087';

export const authApiClient = new ApiClient(`${API_URL}:${API_PORT_AUTH}/${PathEnum.AUTH}`);
export const userApiClient = new ApiClient(`${API_URL}:${API_PORT_USER}/${PathEnum.USER}`);
export const publicationsApiClient = new ApiClient(`${API_URL}:${API_PORT_PUBLICATIONS}/${PathEnum.PUBLICATIONS}`);

export default ApiClient;