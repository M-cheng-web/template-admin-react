import { t } from 'i18next';
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { useCallback } from 'react';
import { create } from 'zustand';
import { loginApi } from '@/api';
import type { UserInfo } from '#/entity';

import { getItem, removeItem, setItem } from '@/utils/storage';
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: string;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: string) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(USER_INFO_KEY) || {},
  userToken: getItem<string>(TOKEN_KEY) || '',
  actions: {
    setUserInfo: (userInfo: UserInfo) => {
      set({ userInfo });
      setItem(USER_INFO_KEY, userInfo);
    },
    setUserToken: (token: string) => {
      set({ userToken: token });
      setItem(TOKEN_KEY, token);
    },
    clearUserInfoAndToken: () => {
      set({ userInfo: {}, userToken: '' });
      removeItem(USER_INFO_KEY);
      removeItem(TOKEN_KEY);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);

export const useUserToken = () => useUserStore((state) => state.userToken);

export const useUserPermissions = () => useUserStore((state) => state.userInfo?.permissions);

export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  const { notification, message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation({
    mutationFn: loginApi,
  });

  const signIn = async (data: any): Promise<any> => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { token } = res as any;
      setUserToken(token);
      setUserInfo(res);
      notification.success({
        message: t('login-success'),
        duration: 3,
      });
      return await Promise.resolve(res);
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  return useCallback(signIn, []);
};
