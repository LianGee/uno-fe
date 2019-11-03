import request from '@/utils/request';

export async function queryAllProject() {
  const params: { count: number } = { count: 8 };
  return request('/api/fake_list', { params });
}

export async function queryProjectById(id: number) {
  const params: { id: number } = { id };
  return request('/api/project/query', { params });
}
