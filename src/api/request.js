import axios from 'axios';
import store from '../store'

const baseUrl = import.meta.env.VITE_APP_BASE_API
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
  dataType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

const pendingRequests = new Map();

const getRequestKey = (config) => {
  const { method, url, params, data } = config;
  return `${method}${url}${JSON.stringify(params)}${JSON.stringify(data)}`;
};

instance.interceptors.request.use(
  (config) => {
    const requestKey = getRequestKey(config);
    if (pendingRequests.has(requestKey)) {
      const cancelSource = pendingRequests.get(requestKey);
      cancelSource.cancel(`Duplicate request cancelled: ${requestKey}`);
      pendingRequests.delete(requestKey);
    }

    const cancelSource = axios.CancelToken.source();
    config.cancelToken = cancelSource.token;
    pendingRequests.set(requestKey, cancelSource);
    return config;
  },
  (error) => {
    console.error(`Error in request interceptor: ${error}`);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const requestKey = getRequestKey(response.config);
    pendingRequests.delete(requestKey);
    if(response.data.code == 4001){
      store.commit('setLoginStatus',false)
    }
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
    } else {
      console.error(`Error in response interceptor: ${error}`);
      if (error.response && error.response.status === 401) {

      }
    }

    return Promise.reject(error);
  }
);

const request = async ({ method, url, data = null, params = null }) => {
  if(method.toLowerCase() == 'get'){
    params={...params,...{
      device_no: localStorage.getItem('device_no'),
    }}
  }
  if(method.toLowerCase() == 'post'){
    data={...data,...{
      device_no: localStorage.getItem('device_no'),
    }}
  }
  try {
    const response = await instance({
        method,
        url,
        data,
        params,
        headers:{
          'Authorization': localStorage.getItem('MountainLion-token'),
        }
      });
    return response.data;
  } catch (error) {
    //console.error(`Error in request: ${error}`);
    return error
  }
};

export default request;
