import request from '@/utils/request';

export async function queryAllBusiness() {
  return request('/apis/business/query/all');
}
