// @ts-nocheck
const cancelTime = 1000; // 取消请求 - 设定取消的请求在规定时间内不允许再次请求

/**
 * 对极短时间内相同的重复请求拦截,阻止请求(防止按钮重复点击, 发出多次相同请求)
 * cancelTime 是为了在设定的时间后将请求从列表剔除, 比如说设定10秒,在这10秒内的相同请求都会被拦截
 */
export default function CancelRequest(this: any, _cancelTime: number = cancelTime) {
  this.reqList = new Map([]); // 正在进行中的请求列表
  this.cancelTime = _cancelTime; // 全局默认的延迟时间
}

/**
 * 阻止重复请求
 */
CancelRequest.prototype.stopRepeatRequest = (config: any, axios: any) => {
  // __retrying 代表此接口是否正在重连,重连的接口不进行重复请求判断
  if (config.cancel && !config.__retrying) {
    let cancel: any; // 请求中断函数
    const url = config.baseURL + config.url;
    // eslint-disable-next-line no-return-assign
    config.cancelToken = new axios.CancelToken((c: any) => (cancel = c));
    this.reqList.get(url) ? cancel(`${url} 请求被中断`) : this.reqList.set(url, true);
  }
};

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 */
CancelRequest.prototype.allowRequest = (config: any) => {
  if (!config) return;
  // eslint-disable-next-line no-unsafe-optional-chaining
  const url = config?.baseURL + config?.url;
  if (config.cancel && this.reqList.get(url)) {
    setTimeout(() => this.reqList.delete(url), config.cancelTime || this.cancelTime);
  }
};
