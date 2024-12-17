import axios from 'axios';
import { getToken } from '../utils/storage';

const BASE_URL = 'https://assignment.stage.crafto.app';
const MEDIA_URL = 'https://crafto.app/crafto/v1.0/media/assignment/upload';

export const login = async (username: string, otp: string) => {
  return axios.post(`${BASE_URL}/login`, { username, otp });
};

export const uploadMedia = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(MEDIA_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const createQuote = async (text: string, mediaUrl: string) => {
  return axios.post(`${BASE_URL}/postQuote`, 
    { text, mediaUrl },
    { 
      headers: { 
        'Authorization': getToken(),
        'Content-Type': 'application/json'
      } 
    }
  );
};

export const getQuotes = async (limit: number = 20, offset: number = 0) => {
    
  const response = await axios.get(`${BASE_URL}/getQuotes`, {
    params: { limit, offset },
    headers: { 'Authorization': getToken() }
  });
  
  return Array.isArray(response.data.data) ? response.data.data : [];
};