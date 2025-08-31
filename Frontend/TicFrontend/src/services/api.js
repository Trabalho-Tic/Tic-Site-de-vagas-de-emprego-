export async function api(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`http://localhost:8000${path}`, { ...options, headers });
  if (res.status === 401) {
    localStorage.clear();
    // window.location = '/login';
  }
  return res;
}