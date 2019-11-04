import request from '@/utils/request';

export async function queryPublishes(params: { projectId?: number }) {
  return request('/publish/list', {
    params,
  });
}
