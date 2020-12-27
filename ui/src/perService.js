async function authAndGetID() {
  let userID;
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
      console.log(response);
      if (response.authorized) userID = response.userId;
      else window.location.href = '/login';
    });
  return userID;
}

module.exports = { authAndGetID }