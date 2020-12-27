async function authAndGetID() {
  let res = null;
  await fetch('/api/service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('AUTH_TOKEN'),
    }),
  })
    .then(response => response.json())
    .then((response) => {
      // console.log(response);
      if (!response.authorized) {
        window.location.href = '/login';
        return;
      }
      res = response;
    });
  return res.userId;
}

module.exports = { authAndGetID };
