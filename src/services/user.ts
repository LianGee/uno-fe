import request from '@/utils/request';

export async function queryUsers(): Promise<any> {
  return request('/apis/user/query/all');
}

export async function register(params: any): Promise<any> {
  return request('/apis/user/register', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function queryCurrent(): Promise<any> {
  return request('/apis/user/current');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
