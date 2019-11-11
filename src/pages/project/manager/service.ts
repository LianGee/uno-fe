import request from '@/utils/request';

export async function save(project: any) {
  return request('/apis/project/save', {
    body: JSON.stringify(project),
    method: 'POST',
  });
}
