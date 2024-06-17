export interface UserInfo {
  userId: string;
  email: string;
  name: string;
  password?: string;
  avatar?: string;
  role?: Role;
  status?: any;
  permissions?: Permission[];
}

export interface Permission {
  id: string;
  parentId: string;
  name: string;
  label: string;
  type: any;
  route: string;
  status?: any;
  order?: number;
  icon?: string;
  component?: string;
  hide?: boolean;
  frameSrc?: string;
  newFeature?: boolean;
  children?: Permission[];
}

export interface Role {
  id: string;
  name: string;
  label: string;
  status: any;
  order?: number;
  desc?: string;
  permission?: Permission[];
}
