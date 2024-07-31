import axios from 'axios'

// Create an instance of axios with default configuration
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10 * 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log(error.config)

    // You can even throw the error to the next catch block
    return Promise.reject(error)
  },
)

export default axiosInstance
