import { request } from '@/utils/http/index';
import { requestOptionType } from '@/types';

/**
 * 登录
 */
export const loginApi = (data?: object): Promise<any> => {
  // const config: requestOptionType = { url: '/auth/login', method: 'post' };
  // return request(config, data);

  return new Promise((resolve) => {
    const data2 = {
      token: 'xxssssyyyqqzzz-vvaaa',
      userage: 12,
      ...data,
    };
    setTimeout(() => {
      resolve(data2);
    }, 1000);
  });
};

// Get User info
export function getUserInfo(data?: object): Promise<any> {
  const config: requestOptionType = { url: '/getUserInfo', method: 'post' };
  return request(config, data);
}

// User logout api
export function logoutApi(data?: object) {
  const config: requestOptionType = { url: '/logout', method: 'get' };
  return request(config, data);
}

// Table list
export function getTableList(data?: object) {
  const config: requestOptionType = { url: '/table/getTableList', method: 'get' };
  return request(config, data);
}

// juejin api
export function getJueJinList(data?: object) {
  const config: requestOptionType = { url: '/article/queryList', method: 'post' };
  return request(config, data);
}

export function getUsersList() {
  return new Promise<any>((resolve) => {
    const data2 = {
      list: Array(10)
        .fill('')
        .map((_, index) => {
          return {
            id: index,
            name: 'Gbeata',
            position: 'Front-end',
            sex: 'male',
            follwer: 1341,
            mits: 231,
            forbid: false,
          };
        }),
    };
    setTimeout(() => {
      resolve(data2);
    }, 1000);
  });
}
