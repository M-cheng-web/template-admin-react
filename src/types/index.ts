import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export type MyAxiosRequestConfig = AxiosRequestConfig & requestOptionType;
// export type MyAxiosResponse = AxiosResponse & requestOptionType
export interface MyAxiosResponse extends Omit<AxiosResponse, 'config'> {
  config: requestOptionType;
}
export interface MyAxiosError extends Omit<AxiosError, 'config' | 'message'> {
  config: requestOptionType;
  message:
    | string
    | {
        data?: any;
        expire?: number;
      };
}

// declare module 'axios' {
//   // export interface AxiosRequestConfig extends MyAxiosRequestConfig
//   export interface AxiosResponse {
//     config: AxiosRequestConfig<any>
//   }
// }

// 请求默认返回值类型
export type requestSuccessType<T = object> = {
  code?: string;
  msg?: string;
  traceId?: string;
  appdata?: T;
  [keys: string]: any;
};

// 请求配置类型
export type requestOptionType = {
  url: string; // 请求地址
  method: string; // 请求类型
  white?: boolean; // 是否白名单 - 发生错误时不需要错误拦截(如果配置了白名单会忽略重连)
  withOut?: boolean; // 是否要外层数据
  cancel?: boolean; // 是否在重复请求时取消本次请求
  cancelTime?: number; // 指定此接口的延迟时间(指的是延迟多久才能开始下一次相同的请求) 优先级: 这里 > config文件
  loading?: boolean; // 是否显示loading
  retry?: number; // 接口错误时重连次数 - 0表示不重连
  httpCache?: boolean; // get请求是否需要浏览器缓存
  cache?: boolean; // 是否需要缓存数据
  cacheExpire?: number; // 此接口数据的缓存时间
  paramsSerial?: boolean; // post请求参数序列化
  withCredentials?: boolean; // 是否跨域
};

export interface UserInfo {
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  token: string;
  desc?: string;
  homePath?: string;
}

export type ThemeMode = 'dark' | 'light';

export type LocaleType = 'zh_CN' | 'en';
