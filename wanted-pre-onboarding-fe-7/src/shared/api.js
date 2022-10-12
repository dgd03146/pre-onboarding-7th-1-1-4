import axios from 'axios';

const api = axios.create({
  baseURL: `https://pre-onboarding-selection-task.shop/`
  // headers: {
  //   'content-type': 'application/json',
  //   accept: 'application/json,'
  // }
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('token'); // localStorage에 TOKEN 저장

  if (accessToken) {
    config.headers.common['Authorization'] = `Bearer ${accessToken}`; // Header에 토큰을 넣어서 보내준다.
  }
  return config;
});

export const authApis = {
  signUp: (user) => api.post('/auth/signup', user),
  signIn: (user) => api.post('/auth/signin', user)
};
