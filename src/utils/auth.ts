/**
 * 对用户 token 进行缓存操作
 * 分两种:
 * 持久缓存 - localStorage
 * 单页面缓存 - sessionStorage
 */
// eslint-disable-next-line max-classes-per-file
type resultTpye = {
  value: string;
  express?: number;
  recordTime: number;
};

const TokenKey = 'Interview-Token';
const TokenRememberKey = 'Interview-TokenRememberKey';

function getTokenRemember() {
  const remember = LocalStorage.getItem(TokenRememberKey);
  if (typeof remember === 'boolean') {
    return remember;
  }
  return true;
}
// 保持登录
export function setTokenRemember(remember: boolean) {
  removeToken();
  LocalStorage.setItem(TokenRememberKey, remember);
}

export function getToken() {
  return getTokenRemember() ? LocalStorage.getItem(TokenKey) : SessionStorage.getItem(TokenKey);
}
export function setToken(token: string, express?: number) {
  return getTokenRemember()
    ? LocalStorage.setItem(TokenKey, token, express)
    : SessionStorage.setItem(TokenKey, token, express);
}
export function removeToken() {
  return getTokenRemember()
    ? LocalStorage.removeItem(TokenKey)
    : SessionStorage.removeItem(TokenKey);
}

/**
 * sessionStorage
 * 可设置过期时间的 storage 封装。到期之后，会在取的时候进行删除。
 */
class SessionStorage {
  /**
   * 设置缓存
   * @param {*} key
   * @param {*} value
   * @param {*} express 过期时间，毫秒数
   */
  static setItem(key: string, value: any, express?: number) {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        value,
        recordTime: Date.now(),
        express,
      }),
    );
  }

  /**
   * 获取缓存
   * @param key
   */
  static getItem(key: string) {
    const result = sessionStorage.getItem(key);
    if (result) {
      const { value, express, recordTime } = JSON.parse(result) as resultTpye;
      if (!express) return value;
      const curTime = Date.now();
      if (curTime > recordTime + express) {
        // 数据已过期
        this.removeItem(key);
        return null;
      }
      return value;
    }
    return null;
  }

  static removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  static clearAll() {
    sessionStorage.clear();
  }
}

/**
 * localStorage
 * 可设置过期时间的 storage 封装。到期之后，会在取的时候进行删除。
 */
class LocalStorage {
  /**
   * 设置缓存
   * @param {*} key
   * @param {*} value
   * @param {*} express 过期时间，毫秒数
   */
  static setItem(key: string, value: any, express?: number) {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
        recordTime: Date.now(),
        express,
      }),
    );
  }

  /**
   * 获取缓存
   * @param key
   */
  static getItem(key: string) {
    const result = localStorage.getItem(key);
    if (result) {
      const { value, express, recordTime } = JSON.parse(result) as resultTpye;
      if (!express) return value;
      const curTime = Date.now();
      if (curTime > recordTime + express) {
        // 数据已过期
        this.removeItem(key);
        return null;
      }
      return value;
    }
    return null;
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clearAll() {
    localStorage.clear();
  }
}

export default Storage;

getTokenRemember();
