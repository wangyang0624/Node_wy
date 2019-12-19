import axios from "axios"
const instance = axios.create();

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么 
  let writeArr = ['/login', '/register']
  if(!writeArr.includes(config.url)){
    let  token  = localStorage.token
    config.headers.token = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default {
  get(url, params) {
    return instance.get(url, { params })
  },
  post(url, params) {
    return instance.post(url, params)
  }
}
