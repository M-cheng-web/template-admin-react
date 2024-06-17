import { AxiosInstance } from 'axios';
import { instanceA } from './http_interceptor';
import { isValidKey } from '@/utils/index';

interface orginalType {
  url?: string;
  method?: string;
  data?: object;
  params?: object;
  [propName: string]: any;
}
interface ObjType {
  [propName: string]: object | ((orginalOption: object, axiosInstance: AxiosInstance) => object);
}

const createApis = (urls: object, axiosInstance: AxiosInstance) => {
  return Object.keys(urls).reduce((sumApi: ObjType, key) => {
    if (isValidKey(key, urls)) {
      const orginalOption: orginalType = urls[key];
      if (!orginalOption.url) {
        sumApi[key] = createApis(orginalOption, axiosInstance);
      } else {
        sumApi[key] = (data, options: orginalType = {}) => {
          const method = (orginalOption.method || 'GET').toUpperCase();
          // 注意: 如有需要这里也可以在调用的时候配置options,可以直接覆盖 (默认配置 + 定义配置)
          options = { ...orginalOption, ...options };
          switch (method) {
            case 'POST':
              options.data = data;
              break;
            case 'GET':
              options.params = data || {};
              break;
            default:
              break;
          }
          return axiosInstance.request(options);
        };
      }
    }
    return sumApi;
  }, {});
};

// vue2 init
const httpInitVue2 = (Vue: any, urls: object) => {
  Vue.$http = createApis(urls, instanceA);
};

// vue3 init
const httpInitVue3 = (app: any, urls: object) => {
  const result = createApis(urls, instanceA);
  // 针对于vue3 的选择的是  全局 provide + 子页面的 inject
  app.provide('$apis', result);
};

/**
 * 以上两个方式 (httpInitVue2 + httpInitVue3)在vue初始化时就将所有api对象都注册变为了方法
 * 但有两个地方不理想:
 * 1. 每个使用的地方都要这样写: const $apis = inject<API.apiTypes>('$apis')，不如直接引入目标apis的方式直观
 * 2. 不利于ts文件引入，比如store中使用
 * 3. 不利于首屏，因为入参 urls 的获取是异步的且全部的，而且它是全导入，不是动态导入
 * 4. 不利于ts，(这里说的是显示声明)
 *    + provide + inject 的方式是不支持天然的类型推断的
 *      必须在 inject 的时候再次声明类型，而且必须声明一个全局类型然后每次新增api都对此类型添加新api，较为繁琐
 *    + 同理想对axios返回的数据声明类型时会发现也要走一遍上面的步骤
 */

/**
 * 提供手动引入执行的request
 * @param option 配置信息
 * @param data 入参
 * @returns promise
 */
const request = (option: orginalType, data?: object): any => {
  const method = (option.method || 'GET').toUpperCase();
  switch (method) {
    case 'POST':
      option.data = data;
      break;
    case 'GET':
      option.params = data || {};
      break;
    case 'PATCH':
      option.data = data || {};
      break;
    case 'PUT':
      option.data = data || {};
      break;
    case 'DELETE':
      option.data = data || {};
      break;
    default:
      break;
  }

  return instanceA.request(option);
};

// eslint-disable-next-line no-restricted-exports
export { httpInitVue2, httpInitVue3 as default, request };
