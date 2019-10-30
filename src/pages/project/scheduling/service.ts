import request from '@/utils/request';

export async function queryFakeList(params: { start: string; end: string }) {
  return request('/api/fake_scheduling', {
    params,
  });
}
