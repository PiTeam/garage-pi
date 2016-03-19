export function get(url, token) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(res => {
      if (res.status !== 200) {
        return reject(new Error('Unauthorized'));
      }
      return resolve(res.json());
    }).catch(err => reject(err));
  });
}

export function del(url, token) {
  return fetch(url, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(res => {
    if (res.status !== 200) {
      throw new Error('Unauthorized');
    }

    return res.json();
  });
}

export function update(url, data, token) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.status !== 200) {
      throw new Error('Unauthorized');
    }

    return res.json();
  });
}

export function post(url, data, token) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.status !== 200) {
      throw new Error('Unauthorized');
    }

    return res.json();
  });
}
