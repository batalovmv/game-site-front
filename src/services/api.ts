import { LoginParams, User } from '../features/auth/types';
import { Client, UpdateStatusParams } from '../features/games/types';
import axios from './axiosConfig'


export const authenticate = async (params: LoginParams): Promise<User> => {
    try {
        const response = await axios.post<User>('/users/login', params);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Unknown error");
    }
};