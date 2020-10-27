export default {
  login: (user) => {
    return fetch('/api/account/login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return {isAuthenticated: false, user: {username: ''}};
    });
  },
  register: (user) => {
    return fetch('/api/account/register', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  logout: () => {
    return fetch('/api/account/logout')
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch('/api/account/authenticated')
		.then((res) => {
		if (res.status !== 401) 
			return res.json()
			.then((data) => data);
      	else 
			return {isAuthenticated: false, user: {username: ''}};
    });
  }
};