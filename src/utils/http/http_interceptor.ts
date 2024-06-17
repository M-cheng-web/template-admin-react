import axios, { AxiosError } from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { instanceA } from './http_axios';
import CancelRequest from './http_cancelRequest';
import CacheRequest from './http_cacheRequest';
import { useUserActions } from '@/stores/modules/userStore';
import { CODE_KEY, SUCCESS_CODE, LOGINOUT_CODE, DATA_KEY } from './http_config';
import { axiosRetryInterceptor, actionLoading, setPublicParams } from './http_utils';
import { MyAxiosRequestConfig, MyAxiosResponse, MyAxiosError } from '@/types';

const cancelRequest = new (CancelRequest as any)(); // 创建取消请求实例
const cacheRequest = new (CacheRequest as any)(); // 创建缓存请求实例

// ------------------------------- 请求拦截 -------------------------------
const requestInterceptors = [
  {
    resolve(config: MyAxiosRequestConfig) {
      cancelRequest.stopRepeatRequest(config, axios); // 取消请求

      setPublicParams(config); // 添加公共参数 (例如 token ，请求头)

      cacheRequest.requestInterceptor(config, axios); // 请求缓存

      if (config?.loading) actionLoading(1); // 全局loading

      return config;
    },
    reject(err: AxiosError) {
      return Promise.reject(err);
    },
  },
];

// ------------------------------- 响应拦截 -------------------------------
const responseInterceptors = [
  {
    resolve(response: MyAxiosResponse | any) {
      const { data, config } = response;

      cancelRequest.allowRequest(config); // 请求取消

      cacheRequest.responseInterceptor(response); // 请求缓存

      if (config?.loading) actionLoading(-1); // 全局loading

      // 成功请求
      if (data[CODE_KEY] === SUCCESS_CODE || config.white) {
        return Promise.resolve(config.withOut ? data : data[DATA_KEY]); // 控制返回外层数据还是内层
      }

      // // 登录失效
      // if (data[CODE_KEY] === LOGINOUT_CODE) {
      //   window.location.hash = '/login'; // 跳转到登录页面
      // }

      message.error({
        content: data.message || 'network malfunction',
        duration: 3,
      });

      return Promise.reject(data);
    },
    reject(error: MyAxiosError) {
      const { config } = error;

      if (config?.loading) actionLoading(-1); // 全局loading

      // 请求被取消的情况(分两种: 1.被缓存取消  2.被重复请求取消)
      if (axios.isCancel(error)) {
        const { message } = error as any;
        if (typeof message !== 'string' && message.expire) {
          // 被缓存功能取消的接口
          return Promise.resolve(message.data); // 这里默认只返回内部数据
        }
        // 被重复请求功能取消的接口
        console.log(message);
      }

      cancelRequest.allowRequest(config); // 请求取消

      if (config?.white) return Promise.resolve('白名单'); // 白名单

      axiosRetryInterceptor(error, instanceA); // 请求错误重连

      return Promise.reject(error);
    },
  },
];

// --------------------------------- 给axios添加请求,响应拦截 ---------------------------------
interface interType {
  resolve: any;
  reject: any;
}

requestInterceptors.forEach(({ resolve, reject }: interType) => {
  instanceA.interceptors.request.use(resolve, reject);
});
// responseInterceptors.forEach(({ resolve, reject }: interType) => {
//   instanceA.interceptors.response.use(resolve, reject);
// });

export const setupInterceptors = (navigate: any, clearUserInfoAndToken: any) => {
  return instanceA.interceptors.response.use(
    (response: MyAxiosResponse | any) => {
      const { data, config } = response;

      cancelRequest.allowRequest(config); // 请求取消

      cacheRequest.responseInterceptor(response); // 请求缓存

      if (config?.loading) actionLoading(-1); // 全局loading

      // 成功请求
      if (data[CODE_KEY] === SUCCESS_CODE || config.white) {
        return Promise.resolve(config.withOut ? data : data[DATA_KEY]); // 控制返回外层数据还是内层
      }

      // 登录失效
      if (data[CODE_KEY] === LOGINOUT_CODE) {
        navigate('/login');
        clearUserInfoAndToken();
      }

      message.error({
        content: data.message || 'network malfunction',
        duration: 3,
      });

      return Promise.reject(data);
    },
    (error: MyAxiosError) => {
      const { config } = error;

      if (config?.loading) actionLoading(-1); // 全局loading

      // 请求被取消的情况(分两种: 1.被缓存取消  2.被重复请求取消)
      if (axios.isCancel(error)) {
        const { message } = error as any;
        if (typeof message !== 'string' && message.expire) {
          // 被缓存功能取消的接口
          return Promise.resolve(message.data); // 这里默认只返回内部数据
        }
        // 被重复请求功能取消的接口
        console.log(message);
      }

      cancelRequest.allowRequest(config); // 请求取消

      if (config?.white) return Promise.resolve('白名单'); // 白名单

      axiosRetryInterceptor(error, instanceA); // 请求错误重连

      return Promise.reject(error);
    },
  );
};

const useAxiosNavigation = () => {
  const navigate = useNavigate();
  const { clearUserInfoAndToken } = useUserActions();

  useEffect(() => {
    const intercetpor = setupInterceptors(navigate, clearUserInfoAndToken);
    return () => {
      instanceA.interceptors.response.eject(intercetpor);
    };
  }, []);
};

export default { instanceA };
export { instanceA, useAxiosNavigation };
