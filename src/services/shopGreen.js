import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
import { backendAddr } from '../utils/config';

export function fetch({ page = 1 }) {
  let skipCount = 0;
  if (page > 1) {
    skipCount = (page - 1) * PAGE_SIZE;
  }

  return request(backendAddr.default+'/v2/storeGreen?maxResultCount=' + PAGE_SIZE + '&skipCount=' + skipCount, {
    method: 'GET',
  });
}
