import http from './httpService';

const apiEndpoint = '/departments';

export function getAll() {
  return http.get(apiEndpoint);
}

const departments = { getAll };

export default departments;
