import request from '@/utils/request';

export async function queryFakeList(params: { projectId: number }) {
  return request('/requirement/list', {
    params,
  });
}

export async function queryRequirementById(id: number) {
  return request(`/requirement/detail?id=${id}`);
}

export async function queryRequirementComments(id: number) {
  return request(`/requirement/comments?id=${id}`);
}
