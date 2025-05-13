
import axios from 'axios';
                                                                                                                              
const axiosInstance = axios.create({
  baseURL: 'http://localhost:7800', // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});



export default axiosInstance;
