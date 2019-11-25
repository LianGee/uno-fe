import request from '@/utils/request';

export async function queryByProjectId(id: any) {
  return request(`/apis/doc/query/project/${id}`);
}
