import { AxiosInstance } from 'axios';
import md5 from '@/utils/md5/index';
import { getToken } from '@/utils/storage';

type obj = {
  [keys: string]: any;
};

/**
 * 控制全局loading
 * type: -1 / 1 表示加一或者减一
 */
export const actionLoading = (type: number) => {
  // window.app.$store.commit('LOADING_COUNT', type)
  // if (window.app.$store.state.user.loadingCount === 0)
  //   window.app.$vux.loading.hide() // 隐藏loading
};

/**
 * 重连
 * 接口报错时会在此判断是否需要重连
 */
export const axiosRetryInterceptor = (err: any, axios: AxiosInstance) => {
  if (!err.config) return;
  const { config } = err;

  if (!config || !config.retry) return;

  config.__retryCount = config.__retryCount || 0;

  if (config.__retryCount >= config.retry) {
    config.__retrying = false; // 表示不在重连中
    return;
  }

  config.__retrying = true; // 表示正在重连中,暂时屏蔽掉重复请求剔除的操作
  config.__retryCount += 1;

  const backoff = new Promise<void>((resolve) => {
    setTimeout(() => {
      return resolve();
    }, config.retryDelay || 1000);
  });

  return backoff.then(() => axios(config));
};

/**
 * 添加公共参数
 * 需要根据实际使用情况自定义
 */
export const setPublicParams = (config: obj) => {
  const { url, data, params, headers, method, httpCache, paramsSerial } = config;

  headers.Authorization = getToken() ? `${getToken()}` : ''; // 请求头添加参数
  // headers.token = getToken() || '' // 请求头添加参数
  headers['Content-Type'] = 'application/json;charset=UTF-8';

  // 针对post请求如果参数为空会导致 Content-Type 为空
  !config.data && (config.data = {});

  // post请求参数序列化
  if (method === 'post' && paramsSerial) {
    if (headers) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    config.transformRequest = [(data: obj | undefined) => paramsDataStringify(data)];
  }

  // get请求添加时间戳
  if (method === 'get' && httpCache) {
    params._ = Date.now();
  }

  // 例如: 为某些接口添加公共的参数 - 带有aaaaaaa的路径添加公共参数
  const arr = url.split('/');
  if (arr && arr[1] === 'aaaaaaa') {
    headers.timestamp = Date.now();
  }

  // 例如: 为某些接口添加公共的参数 - 带有bbbbbbb的路径添加公共参数
  if (arr && arr[1] === 'bbbbbbb') {
    const id = 123;
    if (method === 'get') {
      Object.assign(params, { preAcptId: id });
    } else if (method === 'post') {
      Object.assign(data, { preAcptId: id });
    }
  }
};

/**
 * 判断一个字符串是否为JSON字符串对象
 */
export const isJsonStr = (strObj?: string) => {
  if (typeof strObj === 'string') {
    try {
      const obj = JSON.parse(strObj);
      return typeof obj === 'object' && obj;
    } catch (e) {
      return false;
    }
  }
};

/**
 * 格式化参数
 * *** 默认会屏蔽时间戳 ***
 */
export const paramsDataStringify = (params?: obj) => {
  if (params && typeof params === 'object') {
    const obj = Object.keys(params);
    return obj.reduce((sum, key, index) => {
      if (key === '_') return sum;
      sum += `${key}=${params[key]}${obj.length - 1 === index ? '' : '&'}`;
      return sum;
    }, '');
  }
  return '';
};

/**
 * 获取当前时间戳
 */
export const getNowTime = () => {
  return new Date().getTime();
};

/**
 * 生成唯一Key
 */
export const generateReqKey = (config: any) => {
  // 响应的时候，response.config 中的data 是一个JSON字符串，所以需要转换一下
  if (config && config.data && isJsonStr(config.data)) {
    config.data = JSON.parse(config.data);
  }
  const { method, baseURL, url, params, data } = config; // 请求方式，参数，请求地址，
  const key = md5(
    url,
    method,
    baseURL,
    url,
    paramsDataStringify(params),
    paramsDataStringify(data),
  );
  return key;
};
