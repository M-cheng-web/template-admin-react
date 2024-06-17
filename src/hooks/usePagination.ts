import { useEffect, useState } from 'react';

export interface PaginationRequestFunReturn {
  total: number;
  data: any[];
  isError?: boolean;
  errMessage?: string;
}
export interface PaginationRequestFunParams {
  offset: number;
  limit: number;
  [key: string]: any;
}
interface PaginationParams {
  limit?: number;
  requestFun: (params: PaginationRequestFunParams) => Promise<PaginationRequestFunReturn>;
}

/**
 * 分页相关
 *
 * offset: 查询开始的记录位置，默认为 0
 * limit: 查询记录数，默认为 10
 * requestFun: 请求方法，入参为 {offset, limit}
 */
export function usePagination({ limit = 10, requestFun }: PaginationParams) {
  const [total, setTotal] = useState(1); // 总个数
  const [sumPage, setSumPage] = useState(1); // 总共多少页
  const [pageSize, setPageSize] = useState(limit); // 一页多少数据
  const [page, setPage] = useState(1); // 当前页

  const [data, setData] = useState<any[]>([]); // 当前接口返回的数据
  const [requestPadding, setRequestPadding] = useState<boolean>(false); // 当前接口返回的数据

  const [isReset, setIsReset] = useState(false); // 控制重置
  const [outParams, setOutParams] = useState<any>({}); // 外部参数

  /**
   * 触发分页更改(包括: 更改页 更改一页多少数据)
   */
  function onChangeCPagination(page: number, pageSize: number) {
    setPage(page);
    setPageSize(pageSize);
  }

  /**
   * 触发分页更改(模式2，也就是一次加载所有)
   */
  function onChangeCPagination2(page: number, pageSize: number, total: number) {
    setPage(1);
    setPageSize(total);
  }

  useEffect(() => {
    setSumPage(Math.ceil(total / pageSize));
  }, [total, pageSize]);

  useEffect(() => {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    setRequestPadding(true);
    requestFun({ offset, limit, ...outParams })
      .then((res) => {
        const { total, data } = res;
        setTotal(total);
        setData(data);
      })
      .finally(() => {
        setRequestPadding(false);
      });
  }, [page, pageSize, isReset]);

  /**
   * 重置分页，重新请求
   */
  function resetCPagination(_params = {}) {
    setOutParams(_params);
    setPage(1);
    setIsReset(!isReset);
  }

  return {
    total,
    sumPage,
    page,
    pageSize,
    data,
    requestPadding,
    resetCPagination,
    onChangeCPagination,
    onChangeCPagination2,
  };
}
