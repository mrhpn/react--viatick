import http from './httpService';

const apiEndpoint = '/groups';

export function getAll() {
  return http.get(apiEndpoint);
}

export function create(data) {
  return http.post(apiEndpoint, data);
}

const groups = { getAll, create };

export default groups;
