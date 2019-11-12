import request from '@/utils/request';

export async function queryRequirementByProjectId(params: { projectId: number }) {
  return request('/apis/requirement/query/projectId', {
    params,
  });
}

export async function queryRequirementById(id: number) {
  return request(`/apis/requirement/query/${id}`);
}

export async function queryRequirementComments(id: number) {
  return request(`/requirement/comments?id=${id}`);
}

export async function save(params: any) {
  return request('/apis/requirement/save', {
    body: JSON.stringify(params),
    method: 'POST',
  });
}

export async function statistic(projectId: number) {
  return request(`/apis/requirement/statistic?projectId=${projectId}`);
}
