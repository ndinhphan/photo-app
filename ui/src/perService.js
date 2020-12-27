async function authorize() {
  console.log('checking');
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
        console.log('fail');
        window.location.href = '/login';
        return;
      } else if (window.location.pathname == '/login' || window.location.pathname == '/register') {
        console.log('pass');
        window.location.href = '/home';
        return;
      }
      res = response;
    });
  return res.userId;
}

module.exports = { authorize };
