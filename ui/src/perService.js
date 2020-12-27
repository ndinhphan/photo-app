async function authAndGetID() {
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
          if (!response.authorized) window.location.href = '/login';
          else return userId = response.userId;
        });
    return null;
}

module.exports = { authAndGetID }