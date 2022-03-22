import axios from 'axios';

const api = axios.create({
  baseURL: `http://127.0.0.1:8080`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// POLICY
export function get_policy() {
  return api.get('/api/policy');
};

export function change_policy(data) {
  return api.patch('/api/policy', JSON.stringify(data));
};

// BLACKLIST
export function get_blacklist() {
  return api.get('/api/blocks');
}

export function unblock(ip) {
  return api.post(`/api/unblock/${ip}`);
}

