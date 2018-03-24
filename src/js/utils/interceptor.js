import axios from 'axios'
import Cookies from 'js-cookie'

// Add a request interceptor
export function initInterceptor() {
  axios.interceptors.request.use(function (config) {
    const accessToken = Cookies.get('access_token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
}

export default initInterceptor