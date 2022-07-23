import http from './httpService';

const apiEndpoint = '/groups';

export function getAll() {
  return http.get(apiEndpoint);
}

const groups = { getAll };

export default groups;
