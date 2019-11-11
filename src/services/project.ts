import request from '@/utils/request';

export async function queryAllProject() {
  return request('/apis/project/query/all');
}

export async function queryProjectById(id: number) {
  const params: { id: number } = { id };
  return request('/api/project/query', { params });
}
