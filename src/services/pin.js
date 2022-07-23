import http from './httpService';

const apiEndpoint = '/pins';

export function getAll() {
  return http.get(apiEndpoint);
}

const pins = { getAll };

export default pins;
