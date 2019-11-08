import request from '@/utils/request';

export async function queryUsers(): Promise<any> {
  return request('/apis/user/getAll');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
