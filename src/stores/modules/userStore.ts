import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { useCallback } from 'react';
import { create } from 'zustand';
import { getItem, removeItem, setItem } from '@/utils/storage';

// import { getItem, removeItem, setItem } from '@/utils/storage';
// 由于无法在异步函数中使用 persist, 所以这里无法使用，使用其他的持久化管理方式
// import { persist } from 'zustand/middleware';
import { loginApi } from '@/api';

import type { UserInfo, UserToken } from '#/entity';

import { StorageEnum } from '#/enum';

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo: UserInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (token: UserToken) => {
      set({ userToken: token });
      setItem(StorageEnum.Token, token);
    },
    clearUserInfoAndToken: () => {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);

export const useUserToken = () => useUserStore((state) => state.userToken);

export const useUserPermissions = () => useUserStore((state) => state.userInfo?.permissions);

export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation({
    mutationFn: loginApi,
  });

  const signIn = async (data: any): Promise<any> => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { token, ...rest } = res as any;
      setUserToken({ token });
      setUserInfo(rest);
      notification.success({
        message: t('登录成功'),
        description: t('欢迎回来:{{username}}', { username: data.username }),
        duration: 3,
      });
      return await Promise.resolve(res);
    } catch (error: any) {
      message.error({
        content: error.message,
        duration: 3,
      });
      return Promise.reject(error);
    }
  };

  return useCallback(signIn, []);
};
