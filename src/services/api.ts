import { LoginParams, User } from '../features/auth/types';
import { ApiResponse, FilterParams } from '../features/games/types';
import axios from './axiosConfig'


export const authenticate = async (params: LoginParams): Promise<User> => {
    try {
        const response = await axios.post<User>('/users/login', params);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Unknown error");
    }
};// авторизации пока нет , но у меня в планах добавить, поэтому лежит пустышка

