async function authorization() {
  // let userID;
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
      if (!response.authorized) {
        localStorage.removeItem('AUTH_TOKEN');
        localStorage.removeItem('USER_ID');
        window.location.href = '/login';
      }
    });
  // return userID;
}

module.exports = { authorization }