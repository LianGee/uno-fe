import request from '@/utils/request';

export async function queryPublishes(params: { projectId?: number }) {
  return request('/publish/list', {
    params,
  });
}

export async function queryPublishById(params: { projectId: number, publishId: number }) {
  const { projectId, publishId } = params;
  return request(`/publish/get?projectId=${projectId}&publishId=${publishId}`);
}
