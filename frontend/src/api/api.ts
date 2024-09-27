// src/api.ts
import axios from 'axios';
import axiosInstance from '../config/axiosInstance';

const API_URL = 'http://localhost:4000/api'; // Adjust based on your backend URL

export const loginUser = async (email: string, password: string):Promise<{[key:string]:any}> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`,{email,password});

    return response.data;
  } catch (error:any  ) {
    throw error.response?.data || new Error('An error occurred');
  }
};


export const registerUser = async (name:string, email: string, password: string):Promise<{[key:string]:any}> => {
  try {
    // const response = await axios.post(`${API_URL}/login`, { username, password });
    const response = await axios.post(`${API_URL}/auth/register`,{name, email,password});
    return response.data;
  } catch (error:any  ) {
    throw error.response?.data || new Error('An error occurred');
  }
};


export const fetchBlog = async (pageNumber:number):Promise<{[key:string]:any}> => {
  const url = `/post/get-blog?page=${pageNumber}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error:any  ) {
    let refreshToken = localStorage.getItem('refreshtoken')as string;
    await genRefreshToken(refreshToken);
    
    throw error.response?.data || new Error('An error occurred');
  }
};


export const deleteBlog = async (_id:string):Promise<{[key:string]:any}> => {
  try {
    const response = await axiosInstance.delete(`/post/delete-blog?_id=${_id}`);
    return response.data;
  } catch (error:any  ) {
    let refreshToken = localStorage.getItem('refreshtoken')as string;
    await genRefreshToken(refreshToken);
    throw error.response?.data || new Error('An error occurred');
  }
};



export const addBlog = async (blog:string,isDone:Boolean):Promise<{[key:string]:any}> => {
  try {
    const response = await axiosInstance.post('/post/add-blog',{blog,isDone});
    return response.data;
  } catch (error:any  ) {
    let refreshToken = localStorage.getItem('refreshtoken')as string;
    await genRefreshToken(refreshToken);
    throw error.response?.data || new Error('An error occurred');
  }
};

export const addCommentApi = async (comment:string,blogId:string):Promise<{[key:string]:any}> => {
  try {
    const response = await axiosInstance.post('/post/add-comment',{comment,blogId});
    return response.data;
  } catch (error:any  ) {
    let refreshToken = localStorage.getItem('refreshtoken')as string;
    await genRefreshToken(refreshToken);
    throw error.response?.data || new Error('An error occurred');
  }
};


export const editBlog = async (_id:string,payload:{[key:string]:string|boolean} ):Promise<{[key:string]:any}> => {
  try {
    const response = await axiosInstance.put(`/post/edit-blog?_id=${_id}`,payload);
    return response.data;
  } catch (error:any  ) {
    let refreshToken = localStorage.getItem('refreshtoken')as string;
    await genRefreshToken(refreshToken);
    throw error.response?.data || new Error('An error occurred');
  }
};




// Function to refresh the token
async function genRefreshToken(refreshToken:string):Promise<any>  {
  try {
    const response = await axios.post(`${API_URL}/auth/checkValidate`, {
      token: refreshToken,
    });
    localStorage.setItem('accesstoken','')
    localStorage.setItem('accesstoken',response.data.token.accessToken)
    return response.data.token.accessToken; // Assuming the response contains a new accessToken
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
}

// Function to make a request and handle token expiration
async function makeRequestWithAutoRefresh(url:string ):Promise<any> {
  let accessToken = localStorage.getItem('accesstoken') as string;
  let refreshToken = localStorage.getItem('refreshtoken')as string;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error:any) {
    if (error.response && error.response.status === 401) {
      console.log('Token expired, refreshing...');
      const newAccessToken = await genRefreshToken(refreshToken);
      // Retry the original request with the new access token
      return makeRequestWithAutoRefresh(url);
    } else {
      // Rethrow the error if it's not a token expiration issue
      throw error;
    }
  }
}

