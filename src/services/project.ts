import request from '@/utils/request';

export async function queryAllProject() {
  const params: { count: number } = { count: 8 };
  return request('/api/fake_list', { params });
}
